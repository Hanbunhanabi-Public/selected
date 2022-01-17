package comp3350.chefs_collection.Logic;

import java.util.List;

import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Validator.ValidSubList;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.SubListInterface;


public class AccessSubList {

    private final SubListInterface sublistInterface;
    private final ValidSubList validSubList;


    /**
     * use this for a stubdb
     *
     * @param sublistInterface a stub interface
     */
    public AccessSubList(final SubListInterface sublistInterface) {
        this.validSubList = new ValidSubList();
        this.sublistInterface = sublistInterface;
    }

    /**
     * get all sublist
     *
     * @return a list of general elements
     */
    public List<GeneralElement> fetchAllElement() {
        return sublistInterface.fetchAllElement();
    }

    /**
     * get target sublist
     * @param UID sublsit UID
     * @return a generalElement of sublist
     */
    public GeneralElement getElement(int UID) {
        return sublistInterface.getElement(UID);
    }

    /**
     * delete target sublist
     *
     * @param generalElement target sublist
     * @return true on success
     */
    public boolean deleteElement(GeneralElement generalElement) {
        return sublistInterface.deleteElement(generalElement);
    }


    public boolean addElement(GeneralElement newElement) throws NameException {
        validSubList.validate(newElement);
        return sublistInterface.addElement(newElement);
    }


}
