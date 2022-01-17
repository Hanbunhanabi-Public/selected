package comp3350.chefs_collection.Persistence;

import java.util.List;

import comp3350.chefs_collection.Objects.Recipe;

public interface RecipeInterface {


    /**
     * add recipe to database
     *
     * @param newRecipe new recipe to be add
     * @return true on success
     */
    int addRecipe(Recipe newRecipe);


    /**
     * delete the target recipe
     *
     * @param target target reipe
     * @return true on success
     */
    boolean deleteRecipe(Recipe target);

    /**
     * get all recipes
     *
     * @return list of recipe
     */
    List<Recipe> fetchAllRecipe();

    /**
     * get target recipe
     *
     * @param targetUID target recipe uid
     * @return target recipe
     */
    Recipe getRecipe(int targetUID);

    /**
     * update target recipe
     *
     * @param recipe target recipe
     * @return ture on success
     */
    boolean updateRecipe(Recipe recipe);

    /**
     * get the 10 recent history record
     *
     * @return a list of 10 recipes uid ordered by access time
     */

    List<Integer> fetchAllHistory();

    /**
     * update the target Recipe's history
     * use this method to set ignore flag
     *
     * @param targetRecipe target recipe to update
     * @return true on success
     */
    boolean updateHistory(Recipe targetRecipe);

    /**
     * remove recipe access record
     *
     * @param target target recipe
     * @return true on success
     */
    boolean removeHistory(int target);


}




