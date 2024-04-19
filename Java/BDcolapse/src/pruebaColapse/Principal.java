package pruebaColapse;


import java.sql.SQLException;

public class Principal {
	
	public static void main(String[] args){
		insertTheData(100);
		
			
			long msI = System.currentTimeMillis();
			
				executeThread(300);
			
			long msF = System.currentTimeMillis() - msI;
			System.out.println("Tiempo total de ejecucion en milisegundos: "+msF);
			
			
		}
		
	
	public static void executeThread(int numHilos) {
		System.out.println("Ejecutando conexiones...");
		int t = numHilos;
		
		Thread[] Arrayhilo = new Thread[t];
		
		for(int i = 0; i<t; i++) {
			
				Arrayhilo[i] = new Hilo();
				Arrayhilo[i].setName("Hilo "+i);
				Arrayhilo[i].start();
				
		}
		
		for (int i = 0; i < t; i++) {
            try {
            	Arrayhilo[i].join();
            } catch (InterruptedException e) {
                System.out.println("Hubo un error al culminar el hilo"+e);
            }
        }
		
		int conExitosas = Connect.getConexionesExitosas();
        int conFallidas = Connect.getConexionesFallidas();
		System.out.println("Total de conexiones exitosas: "+conExitosas);
		System.out.println("Total de conexiones fallidas: "+conFallidas);

	}
			
	//Metodo que sera ejecutado en el main para generar un texto aleatorio e insertarlo en la base de datos
	public static void insertTheData(int numRegistros) {
		Inserts objI = new Inserts();
		String texto =  objI.genarateTexto(1000);
//		System.out.println(texto);
		try {
			objI.insertData(numRegistros, texto);
			System.out.println("Se ejecutaron correctamente todos los inserts");
		} catch (SQLException e) {
			System.out.println("Hubo un error al insertar datos en la base de datos"+e);
		}
	}
	
}
		
		




