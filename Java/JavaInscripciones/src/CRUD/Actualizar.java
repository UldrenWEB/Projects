package CRUD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.JTextField;

import java_crud.Conection;

public class Actualizar {

	
	public void update(JTextField noUser, JTextField apUser,JTextField idUser) throws SQLException {
		PreparedStatement ps = null;
		ResultSet rs = null;
		Conection conn = new Conection();
		Connection con = conn.conect();
		
		
		
		int idU = Integer.parseInt(idUser.getText());
		String name = noUser.getText();
		String lastName = apUser.getText();
		
		String sql = "UPDATE users SET no_users = ?, ap_users = ? WHERE id_users = ?";
		con.setAutoCommit(false);
		try {
			ps = con.prepareStatement(sql);
			ps.setString(1, name);
			ps.setString(2, lastName);
			ps.setInt(3, idU);
			
			ps.execute();
			
			con.setAutoCommit(true);
		}catch(Exception e) {
			con.rollback();
			JOptionPane.showMessageDialog(null, "Hubo un error al actualizar datos:  "+e);
		}
	}
}
