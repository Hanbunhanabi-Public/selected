package comp3350.chefs_collection.Persistence;

import java.util.List;

import comp3350.chefs_collection.Objects.Ingredient;

public interface Ingredient2RecipeInterface {
    /**
     * add element to the Ingredient database
     *
     * @param ingredient a new Ingredient
     * @return on success return true
     */
    boolean addElement(Ingredient ingredient);

    /**
     * fetch the ingredient sequence by UID
     * @param UID target recipe uid
     * @return return a list of  that recipe's all ingredient
     */
    List<Ingredient> fetchElementSequences(int UID);

}
