package libreriaPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Properties;


public class DBComponent {
	private static DBComponent dbcomponent = null;
	
	
	private Connection con = null;
	ArrayList<Connection> myPool = null;
	
	//Inicio Contadores
	private static int contPaso = 0;
	//Conexiones activas
	private static int cnnActive = 0;
	
	public static int getCnnActive() {
		return cnnActive;
	}
	//Conexiones activas
	
	//Conexiones totales creadas
	private static int cnnCreadas = 0;
	
	public static int getCnnCreadas() {
		return cnnCreadas;
	}
	//Conexiones totales creadas
	//Fin de contadores
	
	//Archivo de propiedades para sacar los querys
	private Properties propQuerys = null;
	
	private int mc;
	private int gr;
	
	//Inicio de clase params
	ParamsFactory objP = null;
	private LinkedHashMap<Integer, Integer> myPrueba = null;
	//Fin de clase params

	private DBComponent() {
		Pool p = Pool.getInstance();
		DBConnection conn = new DBConnection();
		
		//Inicio clase Params
		this.objP = new ParamsFactory();
		this.myPrueba = ParamsFactory.getPrueba();
		//Fin clase Params
		
		GetProperties prop = new GetProperties();
		//Aqui cargo los archivos
		prop.chargingProperties();
		
		Properties propCnfPool = prop.getPropCnfPool();
		Properties propConfig = prop.getPropConfig();
		this.propQuerys = prop.getPropQuerys();
		
		this.con = conn.Connected(propConfig.getProperty("host"), propConfig.getProperty("port"), propConfig.getProperty("nameDataBase"), propConfig.getProperty("user"), propConfig.getProperty("password"));
		int totalCnn = Integer.parseInt(propCnfPool.getProperty("tc"));
		this.mc= Integer.parseInt(propCnfPool.getProperty("mc"));
		this.gr= Integer.parseInt(propCnfPool.getProperty("gr"));
		
		myPool = p.createPool();
		//Estado inicial de mi pool
		for(int i = 0; i < totalCnn; i++) {
			myPool.add(this.con);
			DBComponent.cnnActive++;
			DBComponent.cnnCreadas++;
		}
		
	}
	
	
//	Patron de diseño Singleton
	
	public static DBComponent getInstance() {
//		System.out.println(dbcomponent);
		if(dbcomponent == null) {
//			System.out.println("Paso instancia");
			dbcomponent = new DBComponent();
			
			
		}
		
		
		return dbcomponent;
	}
	
//	Patron de diseño Singleton
	
	synchronized public Connection getCnn() {
//		System.out.println("Paso metodo");
		if(myPool.size() > 0) {
//			System.out.println(myPool.size() +" | "+this.mc+" | "+ this.cnnCreadas +" | "+ this.cnnActive);
			this.con = myPool.remove(0);
//			System.out.println(this.con);
			DBComponent.cnnActive--;
		}else {
			try {
				Thread.sleep(1);
			} catch (InterruptedException e) {
				System.out.println("Hubo un error al intentar hacer esperar al hilo: "+e);
			}
			if(myPool.size() > 0) {
//				System.out.println(myPool.size() +" | "+this.mc+" | "+ this.cnnCreadas +" | "+ this.cnnActive);
				this.con = myPool.remove(0);
//				System.out.println(this.con);
				DBComponent.cnnActive--;
			}else {
				
				if(this.mc - DBComponent.cnnCreadas > 0) {
			
		
				System.out.println("Paso");
//				DBComponent.contPaso++;
				DBComponent.contPaso += this.gr;
				//Aqui añadiria las conexiones segun mi crecimiento con un metodo 
				//addCnn y obtengo una
				addCnn();
				try {
					Thread.sleep(500);
				} catch (InterruptedException e) {
					System.out.println("Hubo un error al intentar hacer esperar al hilo: "+e);
				}
				//Luego de añadir las conexiones revisa si el pool tienes esas conexiones y la
				//entrega
					this.con = myPool.remove(0);
//					System.out.println(this.con);
					DBComponent.cnnActive--;					
				}else {
				//Esto se da cuando no puedo agregar mas conexiones ya que supera el numero maximo
				//de conexiones establecidas por lo que la conexion que empezaria a entregar si se 
				//da esto seria nula
				System.out.println("Conexiones completadas, incremente su maximo");
				this.con = null;
				
				}
			}
		}
		
		
		
		return this.con;
	}
	
	//Metodo para ingresar conexiones en el ArrayList
	public void addCnn() {
		for(int i = 0; i < this.gr; i++) {
			myPool.add(this.con);
			
			DBComponent.cnnActive++;
			DBComponent.cnnCreadas++;
		}
	}
	
	public void returnCnn(Connection con) {
		try {
			myPool.add(con);
			DBComponent.cnnActive++;			
		}catch(Exception e) {
			System.out.println("Hubo un error al devolver una conexion al pool");
		}
	}
	
	public static int getContPaso() {
		return DBComponent.contPaso;
	}
	
	
	//Metodo para ejecutar query y calcular los parametros
	//para realizar un query mas especifico
	synchronized public ResultSet dbExecute(String sql, LinkedHashMap<Integer, String> objectParams) {
		
		String query = this.propQuerys.getProperty(sql);
		//Contador de veces que se utilizo el metodo append
		int contM = ParamsFactory.getContM();
		
		Connection con = getCnn();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = con.prepareStatement(query);
			
			if(contM > 0) {
				//Inicio de sacar los paramatros del objecto de parametros
				for(int i =0; i< contM; i++) {
					int j = i + 1;
					
					switch(this.myPrueba.get(i)) {
						case 0 : {
							int newValue = Integer.parseInt(objectParams.get(i));
							ps.setInt(j, newValue);
						}
						case 1: {
							String newValue = objectParams.get(i);
							ps.setString(j, newValue);
							
						}
						case 2: {
							Float newValue = Float.parseFloat(objectParams.get(i));
							ps.setFloat(j, newValue);
							
						}
					}
//					if(this.myPrueba.get(i) == "String") {
//					}else if(this.myPrueba.get(i) == "Integer"){
//					}
				}
				//Fin de interpretar parametros
			}
			rs = ps.executeQuery();
			
			
		}catch(Exception e) {
			System.out.println("Hubo un error al intentar ejecutar la consulta");
		}finally {
			returnCnn(con);
		}
		
		
		
		return rs;
	}
	
	synchronized public ResultSet dbExecute(String sql) {
		String query = this.propQuerys.getProperty(sql);
		
		ResultSet rs = null;
		PreparedStatement ps = null;
		Connection con = getCnn();
		
		try {
			
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			
		}catch(Exception e) {
			System.out.println("Hubo un error al intentar ejecutar la consulata sin parametros");
		}finally {
			returnCnn(con);
		}
		
		
		
		
		return rs;
	}
	
	
	
	
	public void dbExecuteUpdates(String sql) throws SQLException {
		String query = this.propQuerys.getProperty(sql);
		
		boolean rs = false;
		PreparedStatement ps = null;
		Connection con = getCnn();
		
		con.setAutoCommit(false);
		
		try {
			ps = con.prepareStatement(query);
			ps.execute();
			rs= true;
			con.commit();
			System.out.println("Se ejecuto correctamente la consulta");
		}catch(Exception e) {
			con.rollback();
			System.out.println("Hubo un error al modificar o insertar un registro en la base de datos: "+e);
		}finally {
			returnCnn(con);
		}
		
	}
	
	
	
	
}
