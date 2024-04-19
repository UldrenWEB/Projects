# Explicacion

Estos son una serie de Scripts con _funciones especificas y asi poder automatizar_ la busqueda de **Host** y **Puertos** de una maquina de manera remota.

# Resumen de cada Script

- **hostDiscovery**: Escaneo de Host en un rango de direcciones IP. Se hace **uso de Hilos** para poder ejecutar cada Proceso en segundo *Plano y agilizar el tiempo de finalización* del Script, sin aplicarle el uso de Hilos este proceso se haría mucho mas lento ya que al hacer un ping a cada host esto toma mucho mas tiempo, es por ello que se aplica un **Timeout** para poder matar el tiempo y que sea mas rápido el proceso.  
- **portScan**: Script de **Bash** el cual le proporcionas un rango de puertos que quieres evaluar y en su salida te *dirá únicamente los puertos que estan activos*. Se hace uso de la ejecución en Segundo Plano para agilizar el proceso.
- **portScanAdvanced**: Script similar al anterior, en este caso se hace uso de **Descriptores de Archivos** para asi agregarle un poco mas de complejidad al script y a su vez mayor velocidad de escaneo.


