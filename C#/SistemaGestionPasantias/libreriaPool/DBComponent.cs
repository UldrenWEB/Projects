using ManejoPasantias;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;

namespace CRUDPRUEBA3.Vistas.libreriaPool
{
    class DBComponent
    {
        private static DBComponent? instance = null;
        private NpgsqlConnection con = null;
        List<NpgsqlConnection> myPool = null;
        ObjectParams myObjectsParams = null;

        //Contadores para informacion Pool
        public static int cnnActive = 0, cnnCreadas = 0;


        /*Inicio de contadores necesarios para el Pool*/
        private int mc = 0;
        private int gr = 0;
        /*Fin de contadores necesarios para el Pool*/

        /*Objeto lock para que en un metodo solo pueda acceder un cliente si el otro ya salio del metodo*/
        private static object lockObject = new object();
        private DBComponent()
        {
            myObjectsParams = new ObjectParams();

            Pool p = Pool.GetInstance();
            DBConnection conn = new();

            //Instancia para cargar mis archivos de configuraciones
            GetProperties objCnf = GetProperties.GetInstance();
            objCnf.ChargedValues();

            //Carga de los valores
            this.mc = objCnf.GetMc();
            this.gr = objCnf.GetGr();
            int tc = objCnf.GetTc();
            this.con = conn.Conectar(connectionString: objCnf.getConnectionString());


            //Doy un estado inicial a mi pool
            myPool = p.CreatePool();
            for (int i = 0; i < tc; i++)
            {
                myPool.Add(this.con);
                cnnActive++;
                cnnCreadas++;
            }

            //Fin Constructor
        }

        //Inicio Patron de diseño singleton
        public static DBComponent GetInstance()
        {
            instance ??= new DBComponent();

            return instance;
        }
        //Fin Patron de diseño singleton

        public NpgsqlConnection getCnn()
        {
            //Metodo el cual solo le va a permitir el acceso a un hilo a la vez para que no haya
            //problemas de concurrencia
            lock (lockObject)
            {
                if (myPool.Count > 0)
                {
                    this.con = myPool[0];
                    myPool.RemoveAt(0);
                    cnnActive--;
                }
                else
                {
                    Thread.Sleep(100);
                    if (myPool.Count > 0)
                    {
                        this.con = myPool[0];
                        myPool.RemoveAt(0);
                        cnnActive--;
                    }
                    else
                    {
                        if (this.mc - cnnCreadas > 0)
                        {
                            //MessageBox.Show("Paso a crear conexiones");
                            AddCnn();
                            Thread.Sleep(500);

                            this.con = myPool[0];
                            myPool.RemoveAt(0);
                            cnnActive--;
                        }
                        else
                        {
                            MessageBox.Show("Conexiones completadas, incremete su maximo");
                        }
                    }
                }

            }


            return this.con;
        }
        private void AddCnn()
        {
            for (int i = 0; i < this.gr; i++)
            {
                myPool.Add(this.con);
                cnnActive++;
                cnnCreadas++;
            }
        }

        public void ReturnCnn(NpgsqlConnection conn)
        {
            myPool.Add(conn);
            cnnActive++;
            //MessageBox.Show("Se devolvio la conexion");
        }

        public void dbExecuteAsync(String query, Dictionary<string, object> parametersValues)
        {

            lock (lockObject)
            {
                List<string> parameterNames = myObjectsParams.GetParameterNames();
                int cParameter = myObjectsParams.CountParameters(query);

                NpgsqlConnection con = getCnn();
                //MessageBox.Show("Conexion?: " + con);
                //MessageBox.Show("List?: " + parameterNames[0]);
                //MessageBox.Show("mapa?: " + parametersValues[parameterNames[0]]);
                NpgsqlDataReader reader = null;
                try
                {
                    NpgsqlCommand command = new NpgsqlCommand(query, con);
                    if (cParameter > 0)
                    {
                        for (int i = 0; i < parametersValues.Count; i++)
                        {
                            //Cargamos parametros al para realizar el query
                            command.Parameters.AddWithValue(parameterNames[i], parametersValues[parameterNames[i]]);
                        }
                    }
                    //Aqui espera con el await que todos los parametros se carguen correctamente para realizar la consulta
                    command.ExecuteNonQuery();
                    //int rowsAfectadas = await task;
                    //MessageBox.Show("Se realizo correctamente la consulta y la carga de parametros a la misma");


                }
                catch (Exception e)
                {
                    MessageBox.Show("Hubo un error al realizar la consulta y cargar los parametros: " + e);
                }
                finally
                {
                    ReturnCnn(con);
                }
            }
            
        }

        public NpgsqlDataReader? dbExecute(String query)
        {
            NpgsqlConnection con = getCnn();
            NpgsqlCommand? command = null;
            NpgsqlDataReader? reader = null;

            command = new(query, con);
            reader = command.ExecuteReader();

            if (reader is not null)
            {
                return reader;
            }
            return null;
        }

        public int getCnnActive() => cnnActive;
        public int getCnnCreadas() => cnnCreadas;



    }
}
