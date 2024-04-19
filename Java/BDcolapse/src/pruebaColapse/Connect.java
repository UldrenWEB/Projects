package pruebaColapse;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Connect {
	private static int contT = 0;
	private static int contF = 0;

	public Connection connected() {
		Connection conection = null;
		String BD = "jdbc:postgresql://localhost:3753/prueba_colapse";
		String user = "postgres";
		String password = "13270323";
		
		try {
			conection = DriverManager.getConnection(BD, user, password);
			//			System.out.println("Se conecto correctamente");
			contT++;				
		}catch(Exception e) {
			contF++;
//			System.out.println("Hubo un error al conectar a la base de datos: "+e);
		}
		return conection;
	}
	
	public void executeQuery(String sql, Connection con){
		PreparedStatement ps = null;
//		ResultSet rs = null;
		try {
			ps = con.prepareStatement(sql);
			ps.executeQuery();
//			while(rs.next()) {
//				System.out.println(rs.getString("texto"));
//			}
//			System.out.println("Se ejecuto correctamente la consulta");
			
			
		}catch(Exception e) {
			
//			System.out.println("Hubo un error al hacer la consulta:  "+e);
		}
	}
	
	public void executeInsert(String sql, Connection con, String text) throws SQLException {
		PreparedStatement ps = null;
		
		
		con.setAutoCommit(false);
		
		try {
			ps = con.prepareStatement(sql);
			ps.setString(1, text);
			ps.execute();
			
			con.commit();
		}catch(Exception e) {
			con.rollback();
			System.out.println("Hubo un error al hacer los inserts: "+e);
		}
		
		
		
	}
	public static int getConexionesExitosas() {
		return contT;
	}
	public static int getConexionesFallidas() {
		return contF;
	}


}
