using CRUDPRUEBA3.Vistas.loader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace CRUDPRUEBA3.Vistas
{
    /// <summary>
    /// Lógica de interacción para PasantiasVista.xaml
    /// </summary>
    public partial class PasantiasVista : UserControl
    {
        Charge objC = new();
        public PasantiasVista()
        {
            InitializeComponent();
            objC.viewData("getPasantia", GridDatosPasantias);
            //Cargamos los elementos en el ComboBox
            objC.chargedDataCB("getPasantes", cbIdPasante, "nombre", "apellido", "id", "Seleccione Pasante");
            objC.chargedDataCB("getTutorAcademico", cbIdAcademico, "nombre", "apellido", "id", "Tutor Academico");
            objC.chargedDataCB("getTutorIndustrial", cbIdIndustrial, "nombre", "apellido", "id", "Tutor Industrial");
            objC.chargedDataCB("getEmpresa", cbIdEmpresa, "nombre", " ", "id", "Seleccione empresa");
        }
        
        private void BtnEnviar_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                //Condicional que detecta si no se selecciona nada y manda un warning y detiene la ejecucion del metodo
                //MessageBox.Show(""+(cbIdPasante.SelectedIndex < 1));
                if (
                    cbIdPasante.SelectedIndex < 0 ||
                    cbIdAcademico.SelectedIndex < 0 ||
                    cbIdIndustrial.SelectedIndex < 0 ||
                    cbIdEmpresa.SelectedIndex < 0
                )
                {
                    MessageBox.Show("Por favor seleccione un elemento en el comboBox", "Falta de valores", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return;
                }

                //Condicional para validar las fechas ya que si es false significa que hubo un error y manda un warning
                //y se detiene la ejecucion del metodo

                bool hola = objC.validarFechas(dpContratacion, dpInicio, dpFin);
                if (hola != true)
                { 
                    return;
                };
                List<DateTime> myFechas = objC.getFechas(dpContratacion, dpInicio, dpFin, "MM-dd-yyyy");
                List<object> list = new()
                {

                    cbIdPasante.SelectedValue,
                    cbIdAcademico.SelectedValue,
                    cbIdIndustrial.SelectedValue,
                    cbIdEmpresa.SelectedValue,
                    myFechas[0],
                    myFechas[1],
                    myFechas[2],
                };

                objC.UpdateOrInsert(insert: "InsertPasantia", update: "UpdatePasantia", values: list, txtBoxId, "testPasantia");
                objC.viewData("getPasantia", GridDatosPasantias);
            }catch(Exception ex)
            {
                MessageBox.Show($"Hay una exception ${ex}");
            }
        }
        private void GridDatosPasantias_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            BtnEliminarPasantia.Visibility = Visibility.Visible;
            List<TextBox> list = new()
            {
                txtBoxId,
            };
            //Cargando elemento en el text Box del ID
            objC.ChargedElementToTextBox(GridDatosPasantias, list);

            //Cargando cada elemento los diferentes comboBox segun lo que se seleccione
            objC.chargedElementToComboBox(GridDatosPasantias, cbIdPasante, "pasante", "nombre");
            objC.chargedElementToComboBox(GridDatosPasantias, cbIdAcademico, "academico", "nombre");
            objC.chargedElementToComboBox(GridDatosPasantias, cbIdIndustrial, "industrial", "nombre");
            objC.chargedElementToComboBox(GridDatosPasantias, cbIdEmpresa, "empresa", "nombre");
            
            //Se hace true para poder hacer el update
            cbIdAcademico.IsEnabled = true;
            cbIdIndustrial.IsEnabled = true;

            //Cargando fechas
            objC.chargeFechasToDP(GridDatosPasantias, dpContratacion, "contracion");
            objC.chargeFechasToDP(GridDatosPasantias, dpInicio, "inicio");
            objC.chargeFechasToDP(GridDatosPasantias, dpFin, "culminacion");
        }

        private void BtnLimpiar_Click(object sender, RoutedEventArgs e)
        {
            BtnEliminarPasantia.Visibility = Visibility.Collapsed;
            objC.chargedDataCB("getPasantes", cbIdPasante, "nombre", "apellido", "id", "Seleccione Pasante");
            objC.chargedDataCB("getTutorAcademico", cbIdAcademico, "nombre", "apellido", "id", "Tutor Academico");
            objC.chargedDataCB("getTutorIndustrial", cbIdIndustrial, "nombre", "apellido", "id", "Tutor Industrial");
            objC.chargedDataCB("getEmpresa", cbIdEmpresa, "nombre", " ", "id", "Seleccione empresa");
           
            //Para que el comboBox deje seleccionar
            cbIdPasante.IsEnabled = true;
            cbIdEmpresa.IsEnabled = true;
            List<TextBox> list = new()
            {
                txtBoxId
            };
            objC.ClearTextBox(list, "ID");
            List<DatePicker> dps = new()
            {
                dpContratacion,
                dpInicio,
                dpFin,
            };
            objC.ClearDatePicker(dps);
            
        }

        private void BtnEliminarPasantia_Click(object sender, RoutedEventArgs e)
        {
            objC.deleteElement("DeletePasantia", txtBoxId);
            objC.viewData("getPasantia", GridDatosPasantias);
        }

    }
}
