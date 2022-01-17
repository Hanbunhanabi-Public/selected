package comp3350.chefs_collection.Logic.Validator;


import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.SubListToRecipe;

public class ValidSubList2Recipe {
    private final static String common = "invalid sublist to recipe: ";

    public ValidSubList2Recipe() {
    }

    public void validate(SubListToRecipe S2R) throws UIDException {
        if (S2R.getRUID() < 1)
            throw new UIDException(common + "invalid ruid");
        if (S2R.getSUID() < 1)
            throw new UIDException(common + "invalid suid");
    }
}

