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
    /// Lógica de interacción para ReportesVista.xaml
    /// </summary>
    public partial class ReportesVista : UserControl
    {
        Charge ch = new();
        public ReportesVista()
        {
            InitializeComponent();
        }

        private void BtnClick_Pasantia(object sender, RoutedEventArgs e)
        {
            Emergente em = new("reportesPasantias", "Reportes Pasantias");
            ch.viewData("getPasantia", em.GridEmergente);
            em.ShowDialog();
        }

        private void BtnClick_Pasantes(object sender, RoutedEventArgs e)
        {
            Emergente em = new("reportesPasantes", "Reportes Pasantes");
            ch.viewData("getPasantes", em.GridEmergente);
            em.ShowDialog();
        }

        private void BtnClick_Tutores(object sender, RoutedEventArgs e)
        {
            Emergente em = new("reportesTutores", "Reportes Tutores");
            ch.viewData("getTutores", em.GridEmergente);
            em.ShowDialog();
        }

        private void BtnClick_Empresas(object sender, RoutedEventArgs e)
        {
            Emergente em = new("reportesEmpresa", "Reportes Empresa");
            ch.viewData("getEmpresa", em.GridEmergente);
            em.ShowDialog();
        }

    }
}
