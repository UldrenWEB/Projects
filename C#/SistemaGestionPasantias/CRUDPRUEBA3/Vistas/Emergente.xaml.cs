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
using CRUDPRUEBA3.PDFGenerator;

namespace CRUDPRUEBA3.Vistas
{
    /// <summary>
    /// Lógica de interacción para Emergente.xaml
    /// </summary>
    public partial class Emergente : Window
    {
        Generator g = new();
        private string fileName;
        private string tituloPDF;
        public Emergente(string fileName, string tituloPDF)
        {
            InitializeComponent();
            this.fileName = fileName;
            this.tituloPDF = tituloPDF;
         }

        private void BtnClick_PDF(object sender, RoutedEventArgs e)
        {
            g.GenerarPdf(GridEmergente, this.fileName, this.tituloPDF);
        }
    }
}
