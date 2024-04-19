using CRUDPRUEBA3.Vistas.libreriaPool;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Windows.Controls;
using System.Windows;
using System.Globalization;

namespace CRUDPRUEBA3.Vistas.loader
{
    class Charge
    {
        DBComponent objPm = null;
        ObjectParams myObjectParams = null;
        GetProperties objProp = null;
        public Charge()
        {
            /*Inicio de instancias para usar en mi clase*/
            objPm = DBComponent.GetInstance();
            myObjectParams = new ObjectParams();
            objProp = GetProperties.GetInstance();
            /*Fin de instancias para usar en mi clase*/
        }

        //Metodo para cargar un data grid segun el query que se le pase
        public void viewData(String key, DataGrid tblName)
        {
            String sql = objProp.extractPropertie(key);
            NpgsqlConnection con = objPm.getCnn();
            try
            {
                //Usamos un adaptador para poder cargar de forma mas dinamica y sin importar
                //cuantos campos tenga nuestra consulta el automaticamente con el metodo Fill
                //llena nuestra tabla con esos datos y los nombres de cada campo son los mismos que
                //al hacer la consulta en el gestor
                tblName.ItemsSource = null;
                NpgsqlDataAdapter adapter = new(sql, con);
                DataTable dt = new();
                adapter.Fill(dt);

                // Convertir los encabezados de columna en mayúsculas
                foreach (DataColumn column in dt.Columns)
                {
                    column.ColumnName = column.ColumnName.ToUpper();
                }

                //Aqui metemos esa tabla dentro de nuestro DataGrid
                tblName.ItemsSource = dt.DefaultView;
            }
            catch (Exception e)
            {
                MessageBox.Show("Hubo un error al realizar la consulta: " + e);
            }
            finally
            {
                //Propagacion de null en C# esto significa si la conexion es diferente de
                //null entonces la cierras
                objPm.ReturnCnn(con);
            }
        }

        //Metodo para insertar en los inputs cada campo del registro seleccionado en el DataGrid
        public void ChargedElementToTextBox(DataGrid tblName, List<TextBox> textbox)
        {


            try
            {
                DataRowView getItemRows = (DataRowView)tblName.SelectedItem;


                if (getItemRows != null)

                {

                    textbox[0].Text = getItemRows["id"].ToString();
                    textbox[1].Text = getItemRows["nombre"].ToString();
                    textbox[2].Text = getItemRows["apellido"].ToString();

                }
            }
            catch (Exception e)
            {
                //MessageBox.Show("Hubo un error al cargar los datos en los textBox" + e);
            }
        }
        /*Inicio Metodos para los comboBox*/

        //Metodo para cargar la columna seleccionada a un solo ComboBox
        public void chargedElementToComboBox(DataGrid tblName, ComboBox myCB, String nameCampoDG, String nameCampoCB)
        {
            DataRowView getItemRows = (DataRowView)tblName.SelectedItem;
            if (getItemRows != null)
            {

                //Este bucle recorre todos los elementos del combobox seleccionado y con eso comprobamos que cuando sea
                //igual al registro del campo seleccionado entonces cuando sean iguales sacamos el indice de ese elemento
                //en el combobox y lo seleccionamos con ese indice para que cuando se haga click en la fila muestre en el
                //combobox ese mismo elemento para modificarlo
                foreach (DataRowView i in myCB.Items)
                {

                    //Este if se realiza lo que se explico anteriormente que es que cuando el nombre y apellido sean iguales
                    //entonces es el que selecciona y automaticamente se deja de seleccionar
                    if (getItemRows[nameCampoDG].ToString() == i[nameCampoCB].ToString())
                    {
                        int indice = myCB.Items.IndexOf(i);
                        //MessageBox.Show("" + indice);
                        myCB.SelectedIndex = indice;
                        myCB.IsEnabled = false;
                        break;
                    }

                }
            }
            
        }

        //Metodo que carga datas en un solo ComboBox, se puede hacer con una lista y se reutiliza codigo
        public void chargedDataCB(String query, ComboBox myCB, String dataCB, String dataCB2, String valueCB, String textoDefault)
        {
            try
            {
                String sql = objProp.extractPropertie(query);

                NpgsqlConnection con = objPm.getCnn();

                NpgsqlCommand command = new NpgsqlCommand(sql, con);
                NpgsqlDataAdapter adapter = new(command);
                DataTable dt = new();
                //Aqui llenamos el dt con los datos de la consulta
                adapter.Fill(dt);

                //Lo hago asi por si le queria meter algo ahi arreglar con un solo if
                if (dataCB2 == " ")
                {
                    //Aqui significa que solo estara un nombre en el comboBox
                }
                else
                {
                    //Con este forEach lo que hacemos es iterar cada fila en el comboBox y le vamos concatenado el apellido a cada
                    //nombre

                    //Basicamente es para cada fila del nombre le concatenamos el apellido
                    foreach (DataRow row in dt.Rows)
                    {
                        string nombreCompleto = string.Format("{0} {1}", row[dataCB], row["apellido"]);
                        row[dataCB] = nombreCompleto;
                    }
                }
                //Agregamos un elemento de placeholder al DataTable
                dt.Rows.InsertAt(dt.NewRow(), 0);
                dt.Rows[0][dataCB] = textoDefault;

                //Aqui asignamos el dt al comboBox
                myCB.ItemsSource = dt.DefaultView;

                //Indicamos la columna que se mostrara en el comboBox
                //Le decimos de que campo sera llenado
                myCB.DisplayMemberPath = dataCB;

                //Indicamos el value de ese dato del comboBox con la otra columna
                myCB.SelectedValuePath = valueCB;

                myCB.SelectedIndex = 0;


                textDefaultCB(myCB, dataCB, textoDefault);
            }
            catch(Exception e)
            {
                MessageBox.Show("Hubo un error al cargar los datos en el ComboBox: " + e);
            }
           

        }

        //Metodo para borrar texto por defecto al desplegar el menu del CB
        public void textDefaultCB(ComboBox myCB, String dataCB, String textDefault)
        {
            myCB.DropDownOpened += (sender, e) =>
            {
                //Obtenemos la fuente de datos
                DataView dataView = (DataView)myCB.ItemsSource;

                //Eliminamos el elemento de placeholder de la fuente de datos
                if (dataView.Count > 0 && dataView[0][dataCB].ToString() == textDefault)
                {
                    dataView.Delete(0);
                }

                //Cargamos nuevamente los datos actualizados en el comboBox
                myCB.ItemsSource = dataView;
            };
        }

        //Metodo para seleccionar el valor del ComboBox, Postdata borrar no lo uso
        public int getSelectedValueCB(ComboBox myCB)
        {
            int value = (int)myCB.SelectedValue;
            return value;
        }
        /*Fin Metodos para los comboBox*/

        /*Inicio de Validacion de fechas*/
        public bool validarFechas(DatePicker dpContratacion, DatePicker dpInicio, DatePicker dpFin)
        {
            //Esto se usa para que si mi fecha es no es nula entonces le asigna el valor que
            //viene pero si es nula entonces esta se le asignara la fecha minimi por defecto (0001-01-01)z
            DateTime dateContratacion = dpContratacion.SelectedDate?.Date ?? DateTime.MinValue.Date;
            DateTime dateInicio = dpInicio.SelectedDate?.Date ?? DateTime.MinValue.Date;
            DateTime dateFin = dpFin.SelectedDate?.Date ?? DateTime.MinValue.Date;

            //Validacion de fechas que sale un warning si alguna de estas se cumple
            //PostData: No se si sean todas las validaciones comprobar
            if (dateContratacion > dateInicio)
            {
                MessageBox.Show("La fecha ingresa de contratacion o de inicio es invalida", "Error de Ingreso", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }
            else if (dateInicio >= dateFin)
            {
                MessageBox.Show("La fecha ingresada de inicio o fin es invalida", "Error de Ingreso", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            return true;
        }

        //Metodo para obtener las fechas de los DatePicker
        public List<DateTime> getFechas(DatePicker dpContratacion, DatePicker dpInicio, DatePicker dpFin, String formato)
        {
            

            DateTime dateContratacion = dpContratacion.SelectedDate?.Date ?? DateTime.MinValue.Date;
            DateTime dateInicio = dpInicio.SelectedDate?.Date ?? DateTime.MinValue.Date;
            DateTime dateFin = dpFin.SelectedDate?.Date ?? DateTime.MinValue.Date;

            //Cambiando el formato a las fechas para poder enviar a la base de datos
            String dataContraFormated = dateContratacion.ToString(formato);
            String dataInitFormated = dateInicio.ToString(formato);
            String dataFinFormated = dateFin.ToString(formato);


            List<DateTime> fechas = new()
            {

                 DateTime.ParseExact(dataContraFormated,formato, CultureInfo.InvariantCulture),
                 DateTime.ParseExact(dataInitFormated, formato, CultureInfo.InvariantCulture),
                 DateTime.ParseExact(dataFinFormated, formato, CultureInfo.InvariantCulture)
            };


            return fechas;
        }

        //Metodo para cargar fechas en los DatePicker
        public void chargeFechasToDP(DataGrid tblName, DatePicker myDP, String nameCampo)
        {
            DataRowView getItemRows = (DataRowView)tblName.SelectedItem;
            if (getItemRows != null)
            {
                //DateTime fecha = Convert.ToDateTime(getItemRows[nameCampo]);

                //Aqui parseo el string a una fecha para poder visualizarla en el DatePicker
                DateTime fecha = DateTime.ParseExact((string)getItemRows[nameCampo], "dd-MM-yyyy", CultureInfo.InvariantCulture);
                myDP.Text = fecha.ToString();
            }
        }
        /*Fin de validacion de fechas*/


        //Metodo el cual utiliza el dbExecute para ejecutar consultas
        public void ExecuteElement(String key, List<object> values)
        {
            String sql = objProp.extractPropertie(key);
            //MessageBox.Show(sql);

            //Insertamos ese esos values mi metodo append que recibe los valores
            myObjectParams.Append(values);
            myObjectParams.GetMapWithValues();
            //Aqui ejecutamos el query que le pasamos y a su vez le pasamos el metodo append el cual devuelve
            //un mapa con esos valores y nombres donde este metodo comprueba y realiza el query segun
            //los parametros que se le metieron

            objPm.dbExecuteAsync(sql, myObjectParams.GetMapWithValues());
            myObjectParams.GetMapWithValues().Clear();
        }

        //Metodo para el boton enviar sobre si es Update o Insert
        public void UpdateOrInsert(String insert, String update, List<object> values, TextBox txtBoxId, String keyTest)
        {
            String sql = objProp.extractPropertie(keyTest);
            NpgsqlConnection con = objPm.getCnn();

            NpgsqlCommand command0 = new NpgsqlCommand(sql, con);
            object? result = 0;
            int id = 0;

            if (txtBoxId.Text == "ID")
            {
                //Aqui significa que no se ha seleccionada ningun elemento en el dataGrid
            }
            else
            {
                id = Convert.ToInt32(txtBoxId.Text);

                //Se ejecuta la busqueda del registro de ese id si existe devuelve 1 o mas en su contrario 0
                command0.Parameters.AddWithValue("@Parameter1", id);
                result = command0.ExecuteScalar();

            }
            int count = result != null ? Convert.ToInt32(result) : 0;
            //MessageBox.Show("" + count);

            objPm.ReturnCnn(con);
            if (count == 0)
            {
                //Aqui se ejecutaria un insert ya que ese id en el cual se ejecutara la consulta no existe
                ExecuteElement(insert, values);
            }
            else
            {
                //Aqui se ejecutaria un update ya que el elemento devuelto es 1 o mas por lo que si existe registro
                
                values.Add(id);
                //MessageBox.Show(""+values[3]);
                ExecuteElement(update, values);
            }
        }

        //Metodo para borrar registros
        public void deleteElement(String key, TextBox txtId)
        {
            List<Object> list = new();
            list.Add(Convert.ToInt32(txtId.Text));

            //MessageBox.Show("" + txtId);
            ExecuteElement(key, list);
        }

        //Metodo para limpiar TextBox
        public void ClearTextBox(List<TextBox> list, String txtIdDefault)
        {
            foreach (var i in list)
            {
                if(i.Name == "txtBoxId")
                {
                    i.Text = txtIdDefault;
                }
                else
                {
                    i.Text = "";
                }

            }
        }

        //Metodo para limpiar DatePicker
        public void ClearDatePicker(List<DatePicker> list)
        {
            foreach (var i in list)
            {
                i.Text = "";
            }
        }

    }
}
