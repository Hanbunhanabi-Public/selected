package comp3350.chefs_collection.Presentation.PresentationObjects;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Objects.Recipe;

public class PresentationRecipe extends Recipe {
    private final ArrayList<GeneralElement> tags;
    private final ArrayList<Ingredient> ingredient;


    //create a empty recipe
    public PresentationRecipe() {
        this.tags = new ArrayList<GeneralElement>();
        this.ingredient = new ArrayList<>();
    }


    //use for fetch and transmit recipe from database to logic, also used for program inner process
    public PresentationRecipe(String name, String content, int UID, ArrayList<GeneralElement> tags,
                              ArrayList<Ingredient> ingredient, int rating, String comment, Timestamp history, boolean isDisplay) {
        super(name, content, UID, rating, comment, history, isDisplay);
        this.tags = tags;
        this.ingredient = ingredient;
    }

    public String tagToString() {
        StringBuilder s = new StringBuilder();
        for (GeneralElement str : tags
        ) {
            s.append(str.getName()).append("\n");
        }
        return s.toString();
    }
    // to string

    private String ingredientToString() {
        StringBuilder s = new StringBuilder();
        for (Ingredient str : ingredient
        ) {
            s.append(str).append("\n");
        }
        return s.toString();
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        PresentationRecipe recipe = (PresentationRecipe) o;
        return Objects.equals(tags, recipe.tags) &&
                Objects.equals(ingredient, recipe.ingredient);
    }



    @Override
    public String toString() {
        return "UID: " + getUID() +
                "\nname: " + getName() +
                "\ntags: " + tagToString() +
                "\ningredient: " + ingredientToString() +
                "\ncontent: " + getContent();
    }


    // getter and setter


    public List<GeneralElement> getTags() {
        return tags;
    }

    public List<Ingredient> getIngredient() {
        return ingredient;
    }


}
