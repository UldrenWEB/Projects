# Proyectos JAVA

Aqui se presentan los diferentes proyectos creados en este lenguaje de programacion de alto nivel, estos proyectos son basicos para poder entender como funcionan y porque se utilizan **pool de conexiones** en los sistemas, tambien otros proyectos como el manejo de inscripciones con java y ademas un pequeño **Framework** como base para el manejo de Sesiones utilizando **Reflection** y creada con **Spring Boot** y **JPA** para la conexion a la base de datos que esta alojada en el Gestor de Base de datos pgAdmin con postgresql.

# Explicacion Proyecto

1. **BDColapse**: Este proyecto fue creado con la finalidad de demostrar cuantas conexiones son capaces de soportar los gestores, para realizar consultas sencillas o con carga.
2. **JavaInscripciones**: En este proyecto se manejan las inscripciones de un usuario para mediante un sistema basico y de escritorio, creado con _java swing_ para la vista.
3. **Pool**: Aqui se creo el **Pool de conexiones**, utilizando hilos y un patron de diseño **Singleton** para manejar una instancia en el proyecto tanto del **Pool** como del **DBManager**, para implementarlo se puede crear apartir de este proyecto un _.jar_ para asi poder implementarlo en tus proyectos.
4. **Session Framework**: Este es el proyecto mas complejo debido a las herramientas que utiliza para su creacion y la logica con la que cuenta por detras, ya que se maneja la **Reflection** para poder ejecutar la logica del Negocio y asi quede **Desaclopado al negocio** que se quiera implementar. 
En este proyecto se utilizan herramientas como **sprint boot**  y _**maven**_ como empaquetador de nuestra aplicacion, ademas se hace uso de **JPA** para poder gestionar la conexion a la base de datos y asi poder autenticar a los usuario,  mediante la **Reflection** logramos tambien autorizarlos.