package comp3350.chefs_collection.Logic;


import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Logic.Exceptions.AmountException;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Objects.Recipe;


public class AutomaticAddRecipe {
    private final AccessRecipe accessRecipe;
    private final AccessTag2Recipe accessTag2Recipe;
    private final AccessIngredient2Recipe accessIngredient2Recipe;

    public AutomaticAddRecipe(AccessRecipe recipe, AccessTag2Recipe tag2Recipe, AccessIngredient2Recipe ingredient2Recipe) {
        this.accessRecipe = recipe;
        this.accessTag2Recipe = tag2Recipe;
        this.accessIngredient2Recipe = ingredient2Recipe;
    }

    public boolean add(Recipe recipe, List<Ingredient> ingredient, List<GeneralElement> tags) throws NameException, UIDException, AmountException {

        int ruid = accessRecipe.addRecipe(recipe);
        boolean is_continue = ruid != -1;
        try {
            if (is_continue) {
                // remove the duplicate input
                removeDuplicateIngredients((ArrayList<Ingredient>) ingredient);
                removeDuplicateTags((ArrayList<GeneralElement>) tags);
                for (Ingredient i : ingredient
                ) {
                    /*here is an identified code smell, that RUID managing belongs to the persistent layer
                     *but we are suffering the incompatible problem between OOP and database, and also due to
                     *the technical debt
                     */

                    i.setRUID(ruid);
                    is_continue = accessIngredient2Recipe.addElement(i);
                    if (!is_continue)
                        break;
                }
                if (is_continue)
                    for (GeneralElement i : tags
                    ) {
                        /*here is an identified code smell, that SUID managing belongs to the persistent layer
                         *but we are suffering the incompatible problem between OOP and database, and also due to
                         *the technical debt
                         */

                        i.setUid(ruid);
                        is_continue = accessTag2Recipe.addElement(i);
                        if (!is_continue) {
                            break;
                        }
                    }
            }
            // for any error clean the remaining
            if (!is_continue) {
                recipe.setUID(ruid);
                accessRecipe.deleteRecipe(recipe);
            }
        }
        // on fail clean the result and throw the exceptions
        catch (NameException e) {
            recipe.setUID(ruid);
            accessRecipe.deleteRecipe(recipe);
            throw e;
        } catch (UIDException e) {
            recipe.setUID(ruid);
            accessRecipe.deleteRecipe(recipe);
            throw e;
        } catch (AmountException e) {
            recipe.setUID(ruid);
            accessRecipe.deleteRecipe(recipe);
            throw e;
        }

        return is_continue;
    }

    private void removeDuplicateIngredients(ArrayList<Ingredient> ingredients) {
        for (int i = 0; i < ingredients.size() - 1; i++) {
            for (int j = i + 1; j < ingredients.size(); j++) {
                if (ingredients.get(i).equals(ingredients.get(j))) {
                    ingredients.remove(j);
                    j -= 1;
                }
            }
        }

    }

    private void removeDuplicateTags(ArrayList<GeneralElement> tags) {
        for (int i = 0; i < tags.size() - 1; i++) {
            for (int j = i + 1; j < tags.size(); j++) {
                if (tags.get(i).equals(tags.get(j))) {
                    tags.remove(j);
                    j -= 1;
                }
            }
        }
    }


}