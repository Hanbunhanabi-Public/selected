package comp3350.chefs_collection.Logic;

import java.util.List;

import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Logic.Validator.ValidSubList2Recipe;
import comp3350.chefs_collection.Objects.SubListToRecipe;
import comp3350.chefs_collection.Persistence.SubList2RecipeInterface;


public class AccessSubList2Recipe {
    private final SubList2RecipeInterface s2RInterface;
    private final ValidSubList2Recipe validSubList2Recipe;


    public AccessSubList2Recipe(final SubList2RecipeInterface s2RInterface) {
        this.validSubList2Recipe = new ValidSubList2Recipe();
        this.s2RInterface = s2RInterface;
    }

    /**
     * get the sublist by sublist uid
     *
     * @param UID recipe uid
     * @return a SubListToRecipe
     */
    public List<SubListToRecipe> fetchAllElementBySUID(int UID) {
        return s2RInterface.fetchAllElementBySUID(UID);
    }

    /**
     * add recipe sublist relation to databse
     *
     * @param s2R a relation
     * @return true on success
     */
    public boolean addElement(SubListToRecipe s2R) throws NameException, UIDException {
        validSubList2Recipe.validate(s2R);
        return s2RInterface.addElement(s2R);
    }

    /**
     * delete sublist relation
     *
     * @param s2R target relation
     * @return true on success
     */
    public boolean deleteElement(SubListToRecipe s2R) {
        return s2RInterface.deleteElement(s2R);
    }


}
