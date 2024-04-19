package libreriaPool;

import java.sql.Connection;
import java.util.ArrayList;

public class Pool {
	private static Pool Pool;
	
	
	//Inicio de patron de diseño singleton
	private Pool(){
		
	}
	public static Pool getInstance() {
		if(Pool == null) {
			Pool = new Pool();
		}
		
		return Pool;
	}
	//Fin de patron de diseño singleton
	
	public ArrayList<Connection> createPool(){
		
		ArrayList<Connection> connects = new ArrayList<Connection>();
		
		
		return connects;
	}
	
}
