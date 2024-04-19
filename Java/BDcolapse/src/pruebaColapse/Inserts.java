package pruebaColapse;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.concurrent.ThreadLocalRandom;

public class Inserts {
	
	public void insertData(int numregistro,String textoRandom) throws SQLException {
		String sql = "INSERT INTO prueba (id_prueba, texto)VALUES (nextval('prueba_id_prueba_seq'), ?)";
		for(int i = 0; i < numregistro; i++) {
			Connect objC = new Connect();
			Connection con = objC.connected();
			try {
				objC.executeInsert(sql, con, textoRandom);
				
			}catch(Exception e){
				
			}
		}	
	}
	
	//Metodos para generar un caracter aleatorio
	public int CaracterRandom(int min, int max) {
		//Aqui regresamos un rango pero con el limite superior, por eso la suma de 1
		return ThreadLocalRandom.current().nextInt(min, max);
	}
	
	public String genarateTexto(int caracteres) {
		String words = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String textoRandom = "";
		
		
		for(int i = 0; i < caracteres; i++) {
			int indiceAleatorio = CaracterRandom(0, words.length());
			char letraRandom = words.charAt(indiceAleatorio);
			textoRandom += letraRandom;
		}
		
		return textoRandom;
	}
}
