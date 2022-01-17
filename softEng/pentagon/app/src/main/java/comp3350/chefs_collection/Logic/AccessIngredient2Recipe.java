package comp3350.chefs_collection.Logic;

import java.util.List;

import comp3350.chefs_collection.Logic.Exceptions.AmountException;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Logic.Validator.ValidIngredient;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Persistence.Ingredient2RecipeInterface;


public class AccessIngredient2Recipe {
    private final Ingredient2RecipeInterface i2RInterface;
    private final ValidIngredient validIngredient;

    /**
     * use this constructor for stub
     *
     * @param i2RInterface a interface for suub
     */
    public AccessIngredient2Recipe(final Ingredient2RecipeInterface i2RInterface) {

        this.validIngredient = new ValidIngredient();
        this.i2RInterface = i2RInterface;
    }

    /**
     * add element to the Ingredient database
     *
     * @param ingredient a new Ingredient
     * @return on success return true
     */
    public boolean addElement(Ingredient ingredient) throws NameException, AmountException, UIDException {
        validIngredient.validate(ingredient);
        return i2RInterface.addElement(ingredient);
    }

    /**
     * fetch the ingredient sequence by UID
     * @param UID target recipe uid
     * @return return a list of  that recipe's all ingredient
     */
    public List<Ingredient> fetchElementSequences(int UID) {

        return i2RInterface.fetchElementSequences(UID);

    }


}
