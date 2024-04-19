using CRUDPRUEBA3.Vistas.loader;
using System;
using System.Collections.Generic;
using System.Data;
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
    /// Lógica de interacción para TutoresVista.xaml
    /// </summary>
    public partial class TutoresVista : UserControl
    {
        Charge objC = new();
        public TutoresVista()
        {
            InitializeComponent();
            objC.viewData("getTutores", GridDatosPasantias);
            objC.chargedDataCB("getTipoTutor", cbTipo, "descripcion", " ", "ti_tutor", "Seleccione el tipo");
        }

        private void BtnEnviar_Click(object sender, RoutedEventArgs e)
        {
            //Aqui definimos que si el usuario no selecciona nada en el combo box pues que este tenga que hacerlo ajuro
            if(cbTipo.SelectedIndex <= 0)
            {
                MessageBox.Show("Por favor seleccione un elemento en el comboBox", "Falta de valores", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }
            List<object> list = new List<object>()
            {
                txtBoxName.Text,
                txtBoxLastName.Text,
                cbTipo.SelectedValue,
            };
            objC.UpdateOrInsert(insert: "InsertTutor", update: "UpdateTutor", values: list, txtBoxId: txtBoxId, keyTest: "testTutor");
            objC.viewData("getTutores", GridDatosPasantias);

        }

        private void GridDatosPasantias_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            BtnEliminarPasantia.Visibility = Visibility.Visible;   
            List<TextBox> list = new List<TextBox>()
            {
                txtBoxId,
                txtBoxName,
                txtBoxLastName,
            };

            //Aqui indicamos que el indice que seleccione en la tabla se pondra en el comboBox como seleccionado
            //Se puede hacer un metodo

            //Papi enmanuel asi era antes imaginate hacer esto para todo aqui porque eras dos elementos en el comboBox
            DataRowView getItemRows = (DataRowView)GridDatosPasantias.SelectedItem;
            //if (getItemRows != null)
            //{
            //    if(getItemRows["tipo"].ToString() == "INDUSTRIAL")
            //    {
            //        cbTipo.SelectedIndex = 0;
            //        cbTipo.IsEnabled = false;
            //    }
            //    else if(getItemRows["tipo"].ToString() == "ACADEMICO")
            //    {
            //        cbTipo.SelectedIndex = 1;
            //        cbTipo.IsEnabled = false;
            //    }
            //}

            //Actual con el metodo, Estuvo duro este metodo pero se logro
            objC.chargedElementToComboBox(GridDatosPasantias, cbTipo, "tipo", "descripcion");
            objC.ChargedElementToTextBox(GridDatosPasantias, list);
        }

        private void BtnLimpiar_Click(object sender, RoutedEventArgs e)
        {
            BtnEliminarPasantia.Visibility = Visibility.Collapsed;

            List<TextBox> list = new() { txtBoxId, txtBoxName, txtBoxLastName };
            cbTipo.Text = "Seleccione";
            cbTipo.IsEnabled = true;

            objC.ClearTextBox(list, "ID");
        }

        private void BtnEliminarPasantia_Click(object sender, RoutedEventArgs e)
        {
            objC.deleteElement("DeleteTutor", txtBoxId);
            objC.viewData("getTutores", GridDatosPasantias);
        }
    }
}
