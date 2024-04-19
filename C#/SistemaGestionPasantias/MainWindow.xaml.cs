using CRUDPRUEBA3.Vistas;
using System.Windows;
using System.Windows.Input;

namespace CRUDPRUEBA3
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void TBShow(object sender, RoutedEventArgs e)
        {
            ContenidoPrincipal.Opacity = 0.5;
        }

        private void TBHide(object sender, RoutedEventArgs e)
        {
            ContenidoPrincipal.Opacity = 1;
        }

        private void PMLBDBG(object sender, MouseButtonEventArgs e)
        {
            BtnShowHide.IsChecked = false;
        }

        private void Minimizar(object sender, RoutedEventArgs e)
        {
            this.WindowState = WindowState.Minimized;
        }

        private void Cerrar(object sender, RoutedEventArgs e)
        {
            Close();
        }

        private void Pasantias_Click(object sender, RoutedEventArgs e)
        {
            DataContext = new PasantiasVista();
            BtnShowHide.IsChecked = false;
        }

        private void BtnPasantes_Click(object sender, RoutedEventArgs e)
        {
            DataContext = new PasantesVista();
            BtnShowHide.IsChecked = false;

        }

        private void BtnTutores_Click(object sender, RoutedEventArgs e)
        {
            DataContext = new TutoresVista();
            BtnShowHide.IsChecked = false;

        }

        private void BtnEmpresas_Click(object sender, RoutedEventArgs e)
        {
            DataContext = new EmpresasVista();
            BtnShowHide.IsChecked = false;

        }

        private void BtnReportes_Click(object sender, RoutedEventArgs e)
        {
            DataContext = new ReportesVista();
            BtnShowHide.IsChecked = false;

        }

    }
}
