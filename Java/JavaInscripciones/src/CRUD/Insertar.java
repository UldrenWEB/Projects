package CRUD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.swing.JComboBox;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

import Inserts.Cargo;
import java_crud.Conection;

public class Insertar {
	private String no_users;
	private String ap_users;
	
	
	public String getNo_users() {
		return no_users;
	}
	public void setNo_users(String no_users) {
		this.no_users = no_users;
	}
	public String getAp_users() {
		return ap_users;
	}
	public void setAp_users(String ap_users) {
		this.ap_users = ap_users;
	}
	
	public void InsertarUser(JTextField nombreUser, JTextField LastNameUser, JComboBox idCargo) throws SQLException {
		String name = nombreUser.getText();
		String lastName = LastNameUser.getText();
		int idC = ((Cargo) idCargo.getItemAt(idCargo.getSelectedIndex())).getId_cargo();
		
		PreparedStatement ps = null;
		Conection conn = new Conection();
		Connection con = conn.conect();
		
		String consulta = "INSERT INTO users(no_users, ap_users, id_cargo) VALUES (?, ?, ?)";
		
		con.setAutoCommit(false);
		try {
			ps = con.prepareStatement(consulta);
			
			ps.setString(1, name);
			ps.setString(2, lastName);
			ps.setInt(3, idC);
			ps.execute();
			
			con.setAutoCommit(true);
		}catch(Exception e) {
			con.rollback();
			JOptionPane.showMessageDialog(null, "Hubo un error al insertar usuario:  "+e);
		}
	}
	
	
	
	
	
}
