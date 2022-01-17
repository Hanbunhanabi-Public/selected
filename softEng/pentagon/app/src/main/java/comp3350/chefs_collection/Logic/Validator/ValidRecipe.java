package comp3350.chefs_collection.Logic.Validator;

import comp3350.chefs_collection.Logic.Exceptions.ContentEcxeption;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.Recipe;


public class ValidRecipe {
    private final static String common = "invalid Recipe: ";

    public ValidRecipe() {
    }

    public void validate(Recipe recipe) throws NameException, UIDException, ContentEcxeption {
        if (recipe.getUID() < 1)
            throw new UIDException(common + "recipe id has not valid");
        if (recipe.getName() == null || recipe.getName().equals("") || recipe.getName().length() >= 20)
            throw new NameException(common + "recipe name can't be empty");
        if (recipe.getContent() == null || recipe.getContent().equals(""))
            throw new ContentEcxeption(common + "recipe content can't be empty");
    }

    public void validate_add(Recipe recipe) throws NameException, UIDException {
        if (recipe.getName() == null || recipe.getName().equals("") || recipe.getName().length() >= 20)
            throw new NameException(common + "recipe name can't be empty");
        if (recipe.getContent() == null || recipe.getContent().equals(""))
            throw new ContentEcxeption(common + "recipe content can't be empty");
    }


}
