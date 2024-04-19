using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using iTextSharp.text;
using iTextSharp;
using iTextSharp.text.pdf;
using System.Data;
using Microsoft.Win32;
using System.Windows;
using System.IO;
using System.Drawing;
using System.Reflection.Metadata;
using System.Windows.Documents;
using System.Windows.Media;
using System.Xml.Linq;

namespace CRUDPRUEBA3.PDFGenerator
{
    class Generator
    {
        public void GenerarPdf(DataGrid dataGrid, String fileName, String tituloArchivo)
        {
            //Esta línea de código registra un proveedor de codificación que permite utilizar codificaciones
            //personalizadas, como la codificación 1250, en la aplicacion

            //Cuando la incluyo toda la aplicacion tiene acceso a esa Codificacion si en ella genera un error
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            //Aqui definimos la fuente que tendra nuestro archivo, la cual utilizamos mas adelante en el texto
            BaseFont bf = BaseFont.CreateFont(BaseFont.TIMES_ROMAN, BaseFont.CP1250, BaseFont.EMBEDDED);

            //Definimos nuestra tabla y sus estilos dentro y las columnas que tendra segun las que tenga nuestra DataGrid
            PdfPTable pdfTable = new(dataGrid.Columns.Count);
            pdfTable.DefaultCell.Padding = 3;
            pdfTable.WidthPercentage = 100;
            pdfTable.HorizontalAlignment = Element.ALIGN_LEFT;
            pdfTable.DefaultCell.BorderWidth = 1;
            pdfTable.DefaultCell.BorderColor = BaseColor.GRAY;

            //Este es el texto del archivo le definimos la fuente lo grande que es y el estilo con nuestro BF
            Font text = new(bf, 10, Font.NORMAL);

            //Iteramos cada columna del dataGrid
            foreach (var column in dataGrid.Columns)
            {
                //Añadiendo Encabezado a la tabla que creamos para el pdf
                if (column.Header != null)
                {
                    PdfPCell cell = new(new Phrase((string)column.Header, text));
                    cell.BackgroundColor = new BaseColor(240, 240, 240);
                    pdfTable.AddCell(cell);
                }
            }

            //Iteramos cada fila del DataGrid
            foreach (var row in dataGrid.Items)
            {
                //Fila actual 
                var dataRowView = (DataRowView)row;

                //Accediendo a cada campo de esa fila
                var cells = dataRowView.Row.ItemArray;
                foreach (var cell in cells)
                {
                    //Imprime el valor de cada campo
                    //Console.WriteLine(cell);

                    //Añadimos la celda que definimos
                    pdfTable.AddCell(new Phrase(cell?.ToString(), text));
                }


            }
            //Aqui sacamos el cuadro de dialogo para guardar archivo para que el usuario pueda decir donde guardara su archivo
            var savedFiledDialoge = new SaveFileDialog();
            savedFiledDialoge.FileName = fileName;
            savedFiledDialoge.DefaultExt = ".pdf";

            if (savedFiledDialoge.ShowDialog() == true)//Aqui el usuario selecciono el archivo
            {
                using (FileStream stream = new(savedFiledDialoge.FileName, FileMode.Create))
                {

                    //Aqui creamos ese documento y le asignamos los padding que queremos y el tamaño de la hoja que sera
                    iTextSharp.text.Document pdfDoc = new(PageSize.A4, 20f, 20f, 20f, 20f);
                    PdfWriter.GetInstance(pdfDoc, stream);
                    pdfDoc.Open();

                    //Aqui agregamos el titulo que queremos y le ponemos los estilos requeridos, por ser un titulo
                    iTextSharp.text.Paragraph title = new(tituloArchivo, new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD));
                    title.Alignment = Element.ALIGN_CENTER;
                    title.SpacingAfter = 10f;
                    title.SpacingBefore = 10f;
                    pdfDoc.Add(title);

                    //Le agregamos al documento esa tabla que cargamos anteriormente con los datos del DataGrid
                    pdfDoc.Add(pdfTable);

                    //Y cerramos tanto el stream como el documento
                    pdfDoc.Close();
                    stream.Close();

                }
            }



        }
    }
}
