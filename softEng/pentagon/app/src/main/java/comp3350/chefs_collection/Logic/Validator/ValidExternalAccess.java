package comp3350.chefs_collection.Logic.Validator;

import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalFileExpection;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

public class ValidExternalAccess {
    private final static String common = "Invalid External Access: ";

    public ValidExternalAccess() {
    }

    public void validate(PresentationRecipe presentationRecipe) throws ExternalFileExpection {
        if (presentationRecipe == null)
            throw new ExternalFileExpection(common + "empty recipe");

    }
}
