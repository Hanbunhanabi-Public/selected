package comp3350.chefs_collection.Logic.Validator;

import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.GeneralElement;


public class ValidTag {
    private final static String common = "invlid tag: ";

    public void validate(GeneralElement tag) throws NameException, UIDException {
        if (tag.getName() == null || tag.getName().equals("") || tag.getName().length() >= 20)
            throw new NameException(common + "tag name can't be null");
        if (tag.getUid() < 1)
            throw new UIDException(common + "tag uid invalid");
    }

}
