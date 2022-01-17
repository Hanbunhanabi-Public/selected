package comp3350.chefs_collection.Logic.Validator;

import comp3350.chefs_collection.Logic.Exceptions.AmountException;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.Ingredient;


public class ValidIngredient {
    private final static String common = "invlid ingredient: ";

    public ValidIngredient() {
    }

    public void validate(Ingredient ingredient) throws NameException, AmountException, UIDException {
        if (ingredient.getName() == null || ingredient.getName().equals("") || ingredient.getName().length() >= 20)
            throw new NameException(common + "name");
        if (ingredient.getRUID() < 1)
            throw new UIDException(common + "RUID");
        if (ingredient.getAmount() == null || ingredient.getAmount().equals(""))
            throw new AmountException(common + "amount");
    }
}
