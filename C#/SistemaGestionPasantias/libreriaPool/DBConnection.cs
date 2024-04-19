using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace ManejoPasantias
{
    class DBConnection
    {
        public NpgsqlConnection Conectar(String connectionString)
        {

            string cadenaConection = connectionString;

            NpgsqlConnection conection = new NpgsqlConnection();
            try
            {
                conection.ConnectionString = cadenaConection;
                conection.Open();

                //MessageBox.Show("Se ha conectado correctamente a la base de datos");
            }
            catch (Exception e)
            {
                MessageBox.Show("No se pudo establecer conexion con la base de datos: " + e.Message);
            }


            return conection;
        }



    }
}
