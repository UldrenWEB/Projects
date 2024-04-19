package libreriaPool;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

	
	
	public Connection Connected(String host, String port, String nameDataBase, String nameUser, String password) {
		Connection connection = null;
		String DB = "jdbc:postgresql://"+host+":"+port+"/"+nameDataBase+"";
		String user = nameUser;
		String pass = password;
		
		try {
			connection = DriverManager.getConnection(DB, user, pass);
//			System.out.println("Se conecto correctamente a la base de datos");
		}catch(SQLException e) {
			System.out.println("Hubo un error al intentar conectarse a la base de datos"+e);
		}
		
		
		return connection;
		
	}
	
	
	
	
}
