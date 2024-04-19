using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace CRUDPRUEBA3.Vistas.libreriaPool
{
    class GetProperties
    {
        private String connectionString = "";
        private int tc, mc, gr;
        private Configuration config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
        private static GetProperties? instance = null;
        private GetProperties() { }

        //Inicio Patron de diseño singleton
        public static GetProperties GetInstance()
        {
            instance ??= new GetProperties();
            return instance;
        }
        //Fin Patron de diseño singleton

        public void ChargedValues()
        {



            //Aqui cargamos la cadena de conexion que usaremos
            connectionString = config.ConnectionStrings.ConnectionStrings["myConnection"].ConnectionString;

            //Aqui cargamos las configuraciones para mi pool
            tc = int.Parse(config.AppSettings.Settings["tc"].Value);
            gr = int.Parse(config.AppSettings.Settings["gr"].Value);
            mc = int.Parse(config.AppSettings.Settings["mc"].Value);


        }
        public String extractPropertie(String key)
        {
            String data = config.AppSettings.Settings[key].Value;
            if (data == null)
            {
                MessageBox.Show("Se introdujo un key equivocado por lo que no se podra extraer info de ese key");
                data = "Hello";
            }

            return data;
        }
        //Inicio de getters
        public int GetTc() => tc;
        public int GetGr() => gr;
        public int GetMc() => mc;

        public String getConnectionString() => connectionString;
        //Fin de getters
    }
}
