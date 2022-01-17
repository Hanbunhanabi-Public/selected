package comp3350.chefs_collection.Presentation;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessIngredient2Recipe;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Logic.AccessTag2Recipe;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

class AssemblePresentRecipe {
    private final AccessRecipe accessRecipe;
    private final AccessTag2Recipe accessTags;
    private final AccessIngredient2Recipe accessIngredient;

    public AssemblePresentRecipe() {
        this.accessRecipe = Service.getAccessRecipe();
        this.accessTags = Service.getAccessT2R();
        this.accessIngredient = Service.getAccessI2R();
    }

    public PresentationRecipe assemble(int UID) {
        Recipe recipe = accessRecipe.getRecipe(UID);
        List<GeneralElement> tags = accessTags.fetchElementSequences(UID);
        List<Ingredient> ingredients = accessIngredient.fetchElementSequences(UID);

        return new PresentationRecipe(recipe.getName(), recipe.getContent(), recipe.getUID(), (ArrayList<GeneralElement>) tags,
                (ArrayList<Ingredient>) ingredients, recipe.getRating(), recipe.getComment(), recipe.getHistory(), recipe.isDisplay());
    }


}
