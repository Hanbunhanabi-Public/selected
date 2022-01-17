package comp3350.chefs_collection.Persistence;

import java.util.List;

import comp3350.chefs_collection.Objects.GeneralElement;

public interface Tag2RecipeInterface {
    /**
     * add tag recipe relation to database
     *
     * @param newElement new tag relation
     * @return true on success
     */
    boolean addElement(GeneralElement newElement);

    /**
     * get a reicpe's all tag
     * @param RUID recipe uid
     * @return a list of General Element
     */
    List<GeneralElement> fetchAllElement(int RUID);

    /**
     * get all recipe uids that has the same
     * @param name target tag name
     * @return a list of General Element contain that name
     */
    List<GeneralElement> fetchAllElement(String name);
}
