package libreriaPool;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class GetProperties {
	private Properties propQuerys = new Properties();
	private Properties propConfig = new Properties();
	private Properties propCnfPool= new Properties();
	
	//Rutas
	private static String querysPath = "querys.properties";
	private static String configPoolPath = "cnfPool.properties";
	private static String configPath = "config.properties";
	
		
	public void chargingProperties() {
		try {
			InputStream InputQuery = getClass().getResourceAsStream(querysPath);
			InputStream InputPool = getClass().getResourceAsStream(configPoolPath);
			InputStream InputCnf = getClass().getResourceAsStream(configPath);
			String path = new File("cnfPool.properties").getAbsolutePath();
			System.out.println(path);
			propQuerys.load(InputQuery);
			propConfig.load(InputCnf);
			propCnfPool.load(InputPool);
		
		}catch(FileNotFoundException e) {
			System.out.println("Hubo un error al intentar buscar el archivo de propiedades: "+e);
		}catch(IOException e) {
			System.out.println("Hubo un error al intentar entrar en el archivo de propiedades: "+e);
		}
	}
	
	//Inicio de getters para obtener los archivo
		public Properties getPropQuerys() {
			return propQuerys;
		}

		public Properties getPropConfig() {
			return propConfig;
		}


		public Properties getPropCnfPool() {
			return propCnfPool;
		}
		//Fin de getters para obtener los archivo
}
