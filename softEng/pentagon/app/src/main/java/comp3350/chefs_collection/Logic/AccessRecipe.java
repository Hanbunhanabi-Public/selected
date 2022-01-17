package comp3350.chefs_collection.Logic;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Logic.Validator.ValidRecipe;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Persistence.RecipeInterface;
import comp3350.chefs_collection.Persistence.hsqldb.PersistenceException;


// This method in logic layer allows the app to communicate with persistence layer and
// the presentation layer.

public class AccessRecipe {
    private final RecipeInterface recipeDatabase;
    private final ValidRecipe validRecipe;


    /**
     * use this for setup stub
     *
     * @param recipeInterfaceIn a stub interface
     */
    public AccessRecipe(final RecipeInterface recipeInterfaceIn){
        this.validRecipe = new ValidRecipe();
        this.recipeDatabase = recipeInterfaceIn;
    }

    /**
     * get all recipes
     *
     * @return list of recipe
     */
    public List<Recipe> fetchAllRecipe() {
        return recipeDatabase.fetchAllRecipe();
    }

    /**
     * get target recipe
     *
     * @param targetUID target recipe uid
     * @return target recipe
     */
    public Recipe getRecipe(int targetUID) {
        return recipeDatabase.getRecipe(targetUID);
    }

    /**
     * get all history record
     *
     * @return a list of all recipes has been accessed
     */
    public List<Integer> fetchAllHistory() {
        return recipeDatabase.fetchAllHistory();
    }

    /**
     * update the target Recipe's history
     * use this method to set ignore flag
     *
     * @param targetRecipe target recipe to update
     * @return true on success
     */
    public boolean updateHistory(Recipe targetRecipe) {
        return recipeDatabase.updateHistory(targetRecipe);
    }

    /**
     * remove recipe access record
     *
     * @param target target recipe
     * @return true on success
     */
    public boolean removeHistory(int target) {
        return recipeDatabase.removeHistory(target);
    }

    /**
     * add recipe to database
     *
     * @param newRecipe new recipe to be add
     * @return true on success
     */
    public int addRecipe(Recipe newRecipe) throws NameException, UIDException {
        validRecipe.validate_add(newRecipe);
        return recipeDatabase.addRecipe(newRecipe);
    }


    /**
     * delete the target recipe
     *
     * @param target target reipe
     * @return true on success
     */
    public boolean deleteRecipe(Recipe target) throws PersistenceException {
        return recipeDatabase.deleteRecipe(target);
    }

    /**
     * update target recipe
     *
     * @param recipe target recipe
     * @return ture on success
     */
    public boolean updateRecipe(Recipe recipe) throws NameException, UIDException {
        validRecipe.validate(recipe);
        return recipeDatabase.updateRecipe(recipe);
    }

    public List<Recipe> fetchRecipes(List<Integer> UIDs) throws PersistenceException {
        ArrayList<Recipe> list = new ArrayList<>();

        for (int i : UIDs) {
            list.add(getRecipe(i));
        }
        return list;
    }
}
