package comp3350.chefs_collection.Persistence.hsqldb;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Persistence.Ingredient2RecipeInterface;


public class Ingredient2RecipeHSQLDB implements Ingredient2RecipeInterface {
    private final Connection connection;

    public Ingredient2RecipeHSQLDB(final String dbPath) {
        try {
            connection = DriverManager.getConnection("jdbc:hsqldb:file:" + dbPath + ";shutdown=true", "SA", "");
        } catch (final SQLException e) {
            throw new PersistenceException(e);
        }
    }

    /**
     * set
     **/
    public boolean addElement(Ingredient ingredient) {

        boolean result = false;
        if (getElement(ingredient.getRUID(), ingredient.getName()) == null) {
            try {

                final PreparedStatement st = connection.prepareStatement("INSERT INTO I2R VALUES(?,?,?)");
                st.setString(1, ingredient.getName());
                st.setInt(2, ingredient.getRUID());
                st.setString(3, ingredient.getAmount());
                result = st.executeUpdate() == 1;

            } catch (SQLException e) {
                throw new PersistenceException(e);
            }
        }
        return result;
    }

    /**
     * get
     **/

    public List<Ingredient> fetchElementSequences(int UID) {
        List<Ingredient> list;
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM I2R " +
                    "WHERE RUID = ?");
            statement.setInt(1, UID);
            list = executFetch(statement);
            statement.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return list;
    }


    private Ingredient getElement(int RUID, String name) {

        Ingredient ingredient = null;
        try {
            final PreparedStatement statement =
                    connection.prepareStatement("SELECT * FROM I2R "
                            + "WHERE  RUID = ? AND INAME = ?");
            statement.setInt(1, RUID);
            statement.setString(2, name);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                ingredient = constructIngredientList(rs);
            }
            statement.close();
            rs.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return ingredient;
    }


    /**
     * private helper methods
     **/

    private Ingredient constructIngredientList(ResultSet rs) throws SQLException {
        return new Ingredient(rs.getInt("RUID"), rs.getString("INAME"), rs.getString("AMOUNT"));

    }

    private List<Ingredient> executFetch(PreparedStatement statement) throws SQLException {
        ResultSet rs = statement.executeQuery();
        List<Ingredient> temp = new ArrayList<>();
        while (rs.next()) {
            temp.add(constructIngredientList(rs));
        }
        rs.close();
        return temp;
    }

}


