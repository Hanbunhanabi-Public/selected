package comp3350.chefs_collection.Persistence;

import java.util.List;

import comp3350.chefs_collection.Objects.SubListToRecipe;

public interface SubList2RecipeInterface {
    /**
     * add recipe sublist relation to databse
     *
     * @param s2R a relation
     * @return true on success
     */
    boolean addElement(SubListToRecipe s2R);

    /**
     * get the sublist by sublist uid
     *
     * @param UID the sublist uid
     * @return a SubListToRecipe
     */
    List<SubListToRecipe> fetchAllElementBySUID(int UID);

    /**
     * delete sublist relation
     *
     * @param s2R target relation
     * @return true on success
     */
    boolean deleteElement(SubListToRecipe s2R);

}
