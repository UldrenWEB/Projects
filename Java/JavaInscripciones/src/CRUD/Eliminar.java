package CRUD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.swing.JOptionPane;
import javax.swing.JTextField;

import java_crud.Conection;

public class Eliminar {

	
	public void Delete(JTextField noUsers, JTextField apUsers) throws SQLException {
		
		String name = noUsers.getText();
		String lastName = apUsers.getText();
		
		PreparedStatement ps = null;
		Conection conn = new Conection();
		Connection con = conn.conect();
		con.setAutoCommit(false);
		
		String consulta = "DELETE FROM users WHERE no_users = ? AND ap_users = ?";
		
		try {
			ps = con.prepareStatement(consulta);
			ps.setString(1, name);
			ps.setString(2, lastName);
			ps.execute();
			
			con.setAutoCommit(true);
		}catch(Exception e) {
			con.rollback();
			JOptionPane.showMessageDialog(null, "Hubo un error al borrar usuario:  "+e);
		}
		
		
	}
	
	
}
