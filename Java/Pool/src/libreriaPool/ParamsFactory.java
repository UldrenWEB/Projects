package libreriaPool;

import java.util.LinkedHashMap;

/**
 * @author Uldren Guedde
 * @version 1.0
 */


public class ParamsFactory {
	

/**Propiedad que define la cantidad de veces que se ha usado el método append */
	private static int contM = 0;
	
	private LinkedHashMap<Integer, String> objectParams = new LinkedHashMap<Integer, String>();
	private static LinkedHashMap<Integer, Integer> dataTypes = new LinkedHashMap<Integer, Integer>();
	
	public static enum DATA_TYPES{TYPE_INTEGER, TYPE_STRING, TYPE_FLOAT}
	
	/**
	 * @return LinkedHashMap tipos de datos de los params
	 */
	public static LinkedHashMap<Integer, Integer> getPrueba(){
		return dataTypes;
	}
	
	/**
	 * Este método permite crear múltiples ParamsFactory
	 * @param type es el tipo de datos
	 * @param value es el valor del parámetro
	 * @return ParamsFactory La misma clase
	 */
	public ParamsFactory append(DATA_TYPES types, String value) {
		
		if(types == DATA_TYPES.TYPE_STRING) {
			objectParams.put(contM, value);
			dataTypes.put(contM, 1);
		}else if(types == DATA_TYPES.TYPE_INTEGER) {
			objectParams.put(contM, value);
			dataTypes.put(contM, 0);
		}else if(types == DATA_TYPES.TYPE_FLOAT){
			objectParams.put(contM, value);
			dataTypes.put(contM, 2);
		}else {
			new Throwable("El tipo de dato ingresado no es valido");
		}
		contM++;
		return this;
	}
	
	public static int getContM() {
		return contM;
	}
	
	
	public LinkedHashMap<Integer, String> getObjectParams(){
		return objectParams;
	}
	
	
	public void clearParams() {
		objectParams.clear();
	}
	
	
	
	
	
	
}
