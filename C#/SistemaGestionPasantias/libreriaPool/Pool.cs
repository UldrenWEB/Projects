using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRUDPRUEBA3.Vistas.libreriaPool
{
    class Pool
    {
        private static Pool? instance = null;

        private Pool() { }

        //Patron de diseño singleton

        public static Pool GetInstance()
        {
            //Aqui usamos una asignacion compuesta de C# que significa que si instance es igual a null
            //entonces sera igual a esa instancia
            instance ??= new Pool();


            return instance;
        }


        public List<NpgsqlConnection> CreatePool()
        {

            List<NpgsqlConnection> connects = new();


            return connects;
        }
    }
}
