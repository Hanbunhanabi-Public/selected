package comp3350.chefs_collection.Logic.Validator;

import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Objects.GeneralElement;


public class ValidSubList {
    private final static String common = "invlid sublist: ";

    public ValidSubList() {
    }

    public void validate(GeneralElement sublist) throws NameException {
        if (sublist.getName() == null || sublist.getName().equals("") || sublist.getName().length() >= 20)
            throw new NameException(common + "name can't be empty or large then 20 characters");
    }

}
