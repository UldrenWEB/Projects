package pruebaColapse;

import java.lang.Thread;
import java.sql.Connection;
import java.sql.SQLException;

public class Hilo extends Thread{
	
//	private static int contFallidas = 0;
//	private static int contExitosas = 0;
	
	public void run() {
		Connect objC = null;
		Connection con = null;
		
		try {
			objC  = new Connect();
			con = objC.connected();
			String sql = "SELECT * FROM prueba";
			objC.executeQuery(sql, con);
			con.close();

//			System.out.println("Se hizo la consulta por : "+this.getName());
//			contExitosas++;

		} catch (Exception e) {
//			contFallidas++;
//			System.out.println("Hubo un error al ejecutar el hilo: "+e);
		}
		finally {
			objC = null;
			con = null;
		}
				
	}

//	public static int getContFallidas() {
//		return contFallidas;
//	}
//
//
//	public static int getContExitosas() {
//		return contExitosas;
//	}

	
}
