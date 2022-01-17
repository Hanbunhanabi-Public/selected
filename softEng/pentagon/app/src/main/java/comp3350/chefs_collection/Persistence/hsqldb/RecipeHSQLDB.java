package comp3350.chefs_collection.Persistence.hsqldb;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Persistence.RecipeInterface;

public class RecipeHSQLDB implements RecipeInterface {

    private final Connection connection;

    public RecipeHSQLDB(final String dbPath) {
        try {
            connection = DriverManager.getConnection("jdbc:hsqldb:file:" + dbPath + ";shutdown=true", "SA", "");
        } catch (final SQLException e) {
            throw new PersistenceException(e);
        }
    }

    /**
     * set
     **/
    public int addRecipe(Recipe newRecipe) {
        int result = -1;
        try {
            final PreparedStatement st = connection.prepareStatement("INSERT INTO RECIPES (NAME,CONTENT,COMMENT, RATING, HISTORY, ISDISPLAY) VALUES(?, ?, ?, ?, ?, ?)");
            st.setString(1, newRecipe.getName());
            st.setString(2, newRecipe.getContent());
            st.setString(3, newRecipe.getComment());
            st.setInt(4, newRecipe.getRating());
            st.setTimestamp(5, newRecipe.getHistory());
            st.setBoolean(6, newRecipe.isDisplay());

            st.executeUpdate();
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }

        try {
            final PreparedStatement st = connection.prepareStatement("SELECT TOP 1 RUID FROM RECIPES ORDER BY RUID DESC");
            ResultSet temp = st.executeQuery();
            if (temp.next())
                result = temp.getInt(1);
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }



        return result;
    }


    /**get**/

    public List<Integer> fetchAllHistory() {
        List<Integer> recipes = new ArrayList<>();
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM RECIPES " +
                    "WHERE HISTORY IS NOT NULL ORDER BY HISTORY DESC");
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                recipes.add(rs.getInt("RUID"));
            }
            statement.close();
            rs.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return recipes;
    }


//recipe
    public ArrayList<Recipe> fetchAllRecipe() {
        ArrayList<Recipe> recipes = new ArrayList<>();
        try {
            final PreparedStatement statement = connection.prepareStatement("SELECT * FROM RECIPES");
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                recipes.add(constructRecipeResultSet(rs));
            }
            statement.close();
            rs.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return recipes;
    }


    //direct get
    public Recipe getRecipe(int targetUID) {

        Recipe recipe = null;
        try {
            PreparedStatement st = null;
            ResultSet rs;
            if (targetUID >= 0)
                st = connection.prepareStatement("SELECT * FROM RECIPES WHERE RUID = ?");

            if (st != null) {
                st.setInt(1, targetUID);
                rs = st.executeQuery();
                if (rs.next()) {
                    recipe = constructRecipeResultSet(rs);
                }
                st.close();
                rs.close();
            }


        } catch (SQLException e) {
            throw new PersistenceException(e);
        }

        return recipe;
    }

    /**update**/

    public boolean updateRecipe(Recipe targetRecipe) {
        boolean result = false;
        try {
            final PreparedStatement st = connection.prepareStatement("UPDATE RECIPES " +
                    "SET NAME = ?, CONTENT = ?, COMMENT = ?, RATING = ?, ISDISPLAY = ?" +
                    "WHERE RUID = ?");
            st.setString(1, targetRecipe.getName());
            st.setString(2, targetRecipe.getContent());
            st.setString(3, targetRecipe.getComment());
            st.setInt(4, targetRecipe.getRating());
            st.setBoolean(5, targetRecipe.isDisplay());
            st.setInt(6, targetRecipe.getUID());
            result = st.executeUpdate() == 1;
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }

    public boolean updateHistory(Recipe targetRecipe) {
        boolean result = false;
        try {
            final PreparedStatement st = connection.prepareStatement("UPDATE RECIPES " +
                    "SET HISTORY = ?, ISDISPLAY = TRUE " +
                    "WHERE RUID = ?");

            Calendar cal = Calendar.getInstance();
            st.setTimestamp(1, new java.sql.Timestamp(cal.getTimeInMillis()));
            st.setInt(2, targetRecipe.getUID());
            result = st.executeUpdate() == 1;
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }


    /**delete**/

    //delete recipe, upon delete, return the deleted recipe,
    public boolean deleteRecipe(Recipe target) {

        boolean result = false;
        try {
            final PreparedStatement st = connection.prepareStatement("" +
                    "DELETE FROM S2R WHERE RUID = ?");
            st.setInt(1, target.getUID());
            st.executeUpdate();
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }

        try {
            final PreparedStatement st = connection.prepareStatement("DELETE FROM RECIPES WHERE RUID = ?");
            st.setInt(1, target.getUID());
            // you should only delete exactly one recipe,
            result = st.executeUpdate() == 1;
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }

    public boolean removeHistory(int target) {

        boolean result = false;
        try {
            PreparedStatement st =
                    connection.prepareStatement("UPDATE RECIPES " +
                            "SET HISTORY=? WHERE RUID = ?");
            st.setTimestamp(1, null);
            st.setInt(2, target);
            // you should only delete exactly one recipe,
            result = st.executeUpdate() == 1;
            st.close();
        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return result;
    }

    /**private helper methods**/

    private Recipe constructRecipeResultSet(ResultSet recipeResSet) {
        Recipe recipe = null;
        try {
            recipe = new Recipe(
                    recipeResSet.getString("NAME"), recipeResSet.getString("CONTENT"),
                    recipeResSet.getInt("RUID"), recipeResSet.getInt("RATING"),
                    recipeResSet.getString("COMMENT"), recipeResSet.getTimestamp("HISTORY"),
                    recipeResSet.getBoolean("ISDISPLAY"));

        } catch (SQLException e) {
            throw new PersistenceException(e);
        }
        return recipe;
    }
}

