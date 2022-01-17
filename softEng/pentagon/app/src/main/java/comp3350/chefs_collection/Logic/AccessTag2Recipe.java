package comp3350.chefs_collection.Logic;

import java.util.List;

import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Logic.Validator.ValidTag;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.Tag2RecipeInterface;


public class AccessTag2Recipe {

    private final Tag2RecipeInterface t2RInterface;
    private final ValidTag validTag;

    /**
     * use this for stubdb
     *
     * @param t2RInterface a stub interface
     */
    public AccessTag2Recipe(final Tag2RecipeInterface t2RInterface) {
        this.validTag = new ValidTag();
        this.t2RInterface = t2RInterface;
    }

    /**
     * get all recipe uids that has the same
     *
     * @param name target tag name
     * @return a list of General Element contain that name
     */
    public List<GeneralElement> fetchElementSequences(String name) {
        return t2RInterface.fetchAllElement(name);
    }


    /**
     * get a reicpe's all tag
     *
     * @param UID recipe uid
     * @return a list of General Element
     */
    public List<GeneralElement> fetchElementSequences(int UID) {
        return t2RInterface.fetchAllElement(UID);
    }

    /**
     * add tag recipe relation to database
     *
     * @param newElement new tag relation
     * @return true on success
     */
    public boolean addElement(GeneralElement newElement) throws NameException, UIDException {
        validTag.validate(newElement);
        return t2RInterface.addElement(newElement);

    }

}
