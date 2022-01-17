package comp3350.chefs_collection.Persistence.hsqldb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.Tag2RecipeInterface;

public class Tag2RecipeHSQLDB implements Tag2RecipeInterface {


    private final Connection connection;

    public Tag2RecipeHSQLDB(final String dbPath) {
        try {
            connection = DriverManager.getConnection("jdbc:hsqldb:file:" + dbPath + ";shutdown=true", "SA", "");
        } catch (final SQLException e) {
            throw new PersistenceException(e);
        }
    }

    public boolean addElement(GeneralElement newElement) {

        boolean result = false;
        if (getElement(newElement.getUid(), newElement.getName()) == null) {

            try {
                final PreparedStatement st = connection.prepareStatement("INSERT INTO T2R VALUES(?,?)");
                st.setString(1, newElement.getName());
                st.setInt(2, newElement.getUid());

                result = st.executeUpdate() > 0;
            } catch (SQLException e) {
                throw new PersistenceException(e);
            }
        }

        return result;
    }


    public List<GeneralElement> fetchAllElement(String name) {
        List<GeneralElement> list = null;
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM T2R " +
                    "WHERE TNAME = ?");
            statement.setString(1, name);
            list = executFetch(statement);
            statement.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return list;
    }

    public List<GeneralElement> fetchAllElement(int RUID) {
        List<GeneralElement> list = null;
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM T2R " +
                    "WHERE RUID = ?");
            statement.setInt(1, RUID);
            list = executFetch(statement);
            statement.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return list;
    }

    private List<GeneralElement> executFetch(PreparedStatement statement) throws SQLException {
        List<GeneralElement> list = new ArrayList<>();
        ResultSet rs = statement.executeQuery();
        while (rs.next()) {
            list.add(constructElement(rs));
        }
        rs.close();
        return list;
    }

    private GeneralElement getElement(int UID, String name) {
        GeneralElement result = null;
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM T2R"
                    + " WHERE RUID = ? AND TNAME = ?");
            statement.setInt(1, UID);
            statement.setString(2, name);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                result = constructElement(rs);
            }
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }

    /**
     * private helper method
     **/
    private GeneralElement constructElement(ResultSet rs) throws SQLException {
        return new GeneralElement(rs.getInt("RUID"), rs.getString("TNAME"));
    }


}
