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
    /// Lógica de interacción para EmpresasVista.xaml
    /// </summary>
    public partial class EmpresasVista : UserControl
    {
        Charge objC = new();
        public EmpresasVista()
        {
            InitializeComponent();
            objC.viewData("getEmpresa", GridDatosPasantias);
        }
        private void GridDatosPasantias_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            BtnEliminarPasantia.Visibility = Visibility.Visible;
            List<TextBox> list = new()
            {
                txtBoxId,
                txtBoxName,
            };
            objC.ChargedElementToTextBox(GridDatosPasantias, list);
        }

        private void BtnEnviar_Click(object sender, RoutedEventArgs e)
        {
            List<object> list = new()
            {
                txtBoxName.Text,
            };
            objC.UpdateOrInsert(insert: "InsertEmpresa", update: "UpdateEmpresa", list, txtBoxId, "testEmpresa");
            objC.viewData("getEmpresa", GridDatosPasantias);
        }

        private void BtnLimpiar_Click(object sender, RoutedEventArgs e)
        {
            BtnEliminarPasantia.Visibility = Visibility.Collapsed;
            List<TextBox> list = new()
            {
                txtBoxId,
                txtBoxName,
            };
            objC.ClearTextBox(list, "ID");
        }

        private void BtnEliminarPasantia_Click(object sender, RoutedEventArgs e)
        {
            objC.deleteElement("DeleteEmpresa", txtBoxId);
            objC.viewData("getEmpresa", GridDatosPasantias);
        }

    }
}
