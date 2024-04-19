using CRUDPRUEBA3.PDFGenerator;
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
    /// Lógica de interacción para PasantesVista.xaml
    /// </summary>
    public partial class PasantesVista : UserControl
    {
        Charge objC = new();
        public PasantesVista()
        {
            InitializeComponent();
            objC.viewData("getPasantes", GridDatosPasantias);
        }

        private void BtnEnviar_Click(object sender, RoutedEventArgs e)
        {
            List<object> list = new List<object>()
            {
                txtBoxName.Text,
                txtBoxLastName.Text,
            };
            objC.UpdateOrInsert(insert: "InsertPasante", update: "UpdatePasante", list, txtBoxId: txtBoxId, keyTest: "testPasante");
            objC.viewData("getPasantes", GridDatosPasantias);
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
            objC.ChargedElementToTextBox(GridDatosPasantias, list);
        }

        private void BtnLimpiar_Click(object sender, RoutedEventArgs e)
        {
            BtnEliminarPasantia.Visibility = Visibility.Collapsed;
            List<TextBox> list = new List<TextBox>()
            {
                txtBoxId,
                txtBoxName,
                txtBoxLastName,
            };
            objC.ClearTextBox(list, "ID");
        }

        private void BtnEliminarPasantia_Click(object sender, RoutedEventArgs e)
        {
            objC.deleteElement("DeletePasante", txtBoxId);
            objC.viewData("getPasantes", GridDatosPasantias);

        }
    }
}
