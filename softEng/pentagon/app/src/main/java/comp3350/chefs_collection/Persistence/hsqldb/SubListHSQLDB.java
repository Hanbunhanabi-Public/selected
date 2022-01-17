package comp3350.chefs_collection.Persistence.hsqldb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.SubListInterface;


public class SubListHSQLDB implements SubListInterface {

    private final Connection connection;


    public SubListHSQLDB(final String dbPath) {
        try {
            connection = DriverManager.getConnection("jdbc:hsqldb:file:" + dbPath + ";shutdown=true", "SA", "");
        } catch (final SQLException e) {
            throw new PersistenceException(e);
        }
    }

    public boolean addElement(GeneralElement newElement) {

        boolean result = false;
        if (getElement(newElement.getName()) == null) {

            try {
                final PreparedStatement st = connection.prepareStatement("INSERT INTO SUBLISTS (SNAME) VALUES(?)");
                st.setString(1, newElement.getName());
                result = st.executeUpdate() > 0;
            } catch (SQLException e) {
                throw new PersistenceException(e);
            }
        }

        return result;
    }

    public GeneralElement getElement(int UID) {
        GeneralElement result = null;
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM SUBLISTS WHERE SUID = ?");
            statement.setInt(1, UID);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                result = constructElement(rs);
            }
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }

    public boolean deleteElement(GeneralElement generalElement) {
        boolean result = false;

        try {
            PreparedStatement st = connection.prepareStatement("DELETE FROM S2R WHERE SUID = ?");
            st.setInt(1, generalElement.getUid());
            // you should only delete exactly one recipe,
            st.executeUpdate();
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }

        try {
            PreparedStatement st = connection.prepareStatement("DELETE  FROM SUBLISTS WHERE SUID = ?");
            st.setInt(1, generalElement.getUid());
            // you should only delete exactly one recipe,
            result = st.executeUpdate() == 1;

        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }


    /**
     * get
     **/
    public List<GeneralElement> fetchAllElement() {
        List<GeneralElement> list = new ArrayList<>();
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM SUBLISTS");
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                list.add(constructElement(rs));
            }
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return list;
    }


    /**
     * private helper method
     **/
    private GeneralElement constructElement(ResultSet rs) throws SQLException {
        return new GeneralElement(rs.getInt("SUID"), rs.getString("SNAME"));
    }


    private GeneralElement getElement(String name) {
        GeneralElement result = null;
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM SUBLISTS WHERE SNAME = ?");
            statement.setString(1, name);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                result = constructElement(rs);
            }
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }

}




