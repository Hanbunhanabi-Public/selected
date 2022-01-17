package comp3350.chefs_collection.Persistence;


import java.util.List;

import comp3350.chefs_collection.Objects.GeneralElement;

public interface SubListInterface {

    /**
     * add new sublist to database
     *
     * @param newElement new sublist
     * @return true on success
     */
    boolean addElement(GeneralElement newElement);

    /**
     * get all sublist
     * @return a list of general elements
     */
    List<GeneralElement> fetchAllElement();

    /**
     * get target sublist
     * @param UID sublsit UID
     * @return a generalElement of sublist
     */
    GeneralElement getElement(int UID);


    /**
     * delete target sublist
     * @param generalElement target sublist
     * @return true on success
     */
    boolean deleteElement(GeneralElement generalElement);
}
