package comp3350.chefs_collection.Persistence.hsqldb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Objects.SubListToRecipe;
import comp3350.chefs_collection.Persistence.SubList2RecipeInterface;

public class SubList2RecipeHSQLDB implements SubList2RecipeInterface {


    private final Connection connection;

    public SubList2RecipeHSQLDB(final String dbPath) {
        try {
            connection = DriverManager.getConnection("jdbc:hsqldb:file:" + dbPath + ";shutdown=true", "SA", "");
        } catch (final SQLException e) {
            throw new PersistenceException(e);
        }
    }

    /**
     * set
     **/
    public boolean addElement(SubListToRecipe s2R) {
        boolean result = false;
        if (getElement(s2R) == null) {
            try {
                final PreparedStatement st = connection.prepareStatement("INSERT INTO S2R (SUID,RUID) VALUES(?,?)");
                st.setInt(1, s2R.getSUID());
                st.setInt(2, s2R.getRUID());
                result = st.executeUpdate() == 1;
                st.close();
            } catch (SQLException e) {
                throw new PersistenceException(e);
            }
        }
        return result;
    }

    /**
     * get
     **/
    public List<SubListToRecipe> fetchAllElementBySUID(int UID) {
        List<SubListToRecipe> list = new ArrayList<>();
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM S2R " +
                    "WHERE SUID = ?");
            statement.setInt(1, UID);
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                list.add(constructS2R(rs));
            }
            statement.close();
            rs.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return list;
    }

    /**
     * delete
     **/
    public boolean deleteElement(SubListToRecipe s2R) {


        boolean result = false;

        try {
            PreparedStatement st = connection.prepareStatement
                    ("DELETE FROM S2R WHERE RUID = ? AND SUID = ?");
            st.setInt(1, s2R.getRUID());
            st.setInt(2, s2R.getSUID());
            // you should only delete exactly one recipe,
            result = st.executeUpdate() == 1;
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
//        }
        return result;
    }


    /**
     * private helper methods
     **/

    private SubListToRecipe constructS2R(ResultSet rs) throws SQLException {
        return new SubListToRecipe(rs.getInt("SUID"), rs.getInt("RUID"));
    }


    private SubListToRecipe getElement(SubListToRecipe list) {

        SubListToRecipe subListToRecipe = null;
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM S2R " +
                    "WHERE RUID = ? AND SUID = ?");
            statement.setInt(1, list.getRUID());
            statement.setInt(2, list.getSUID());
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                subListToRecipe = constructS2R(rs);
            }
            statement.close();
            rs.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return subListToRecipe;
    }

}

