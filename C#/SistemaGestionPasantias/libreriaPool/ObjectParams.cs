using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CRUDPRUEBA3.Vistas.libreriaPool
{
    class ObjectParams
    {
        private List<string> parameterNames = new();
        private Dictionary<string, object> parameters = new();
        public ObjectParams()
        {
            //Aqui llenamos esta lista con los nombres por defecto para poder usarla
            for (int i = 0; i < 8; i++)
            {
                parameterNames.Add($"@Parameter{i + 1}");
            }
        }
        /*Inicio de metodos para interpretar un query*/
        public int CountParameters(string query)
        {
            // Crear una expresión regular para buscar los nombres de los parámetros
            Regex regex = new Regex(@"@");

            // Contar el número de coincidencias de la expresión regular en el comando SQL
            int count = regex.Matches(query).Count;

            // Devolver el número de parámetros encontrados
            return count;
        }



        //Este metodo solo recibe un parametro de tipo lista con los values y de ahi a cada parametro de la su valor
        //Y devuelve un mapa el cual se utiliza en el metodo que realiza los querys
        public void Append(List<object> myValues)
        {

            for (int i = 0; i < myValues.Count; i++)
            {
                parameters.Add(parameterNames[i], myValues[i]);
            }
        }
        /*Fin de metodos para interpretar un query*/

        public Dictionary<string, object> GetMapWithValues() => parameters;
        public List<string> GetParameterNames() => parameterNames;
    }
}
