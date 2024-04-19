# Explicacion

Este es un sistema el cual se encarga de manejar las pasantias de los estudiantes, asi como tambien los profesores que las asignan y aque empresan pueden ser asignados.

## Herramientas utilizadas

- **Pool Connections**: Para este sistema se utiliza un pool de conexiones al Gestor de Base de datos utilizados, este pool utiliza un patron de diseño **Singleton** y los diferentes hilos para reutilizar conexiones y utilizar mas conexiones de las necesarias segun el uso y acceso a la base de datos que necesita.
- **Config File**: Se utiliza un **archivo de configuraciones** para que la conexion a la base de datos pueda ser _gestionada y modificada a partir de un archivo_ de configuracion y las diferentes variables que necesita el pool, como el maximo de conexiones, el crecimiento de conexiones en caso de necesitar mas y otras variables que necesita nuestra aplicacion, son **gestionadas en este archivo**.

