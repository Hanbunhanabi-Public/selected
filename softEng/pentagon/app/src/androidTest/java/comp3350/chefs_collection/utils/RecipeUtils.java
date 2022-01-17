package comp3350.chefs_collection.utils;

import android.support.test.espresso.Espresso;
import android.support.test.espresso.action.ViewActions;

import java.util.ArrayList;

import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;
import comp3350.chefs_collection.R;

import static android.support.test.espresso.Espresso.onData;
import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.clearText;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.action.ViewActions.scrollTo;
import static android.support.test.espresso.action.ViewActions.typeText;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.CoreMatchers.anything;

public class RecipeUtils {
    public static final String NAME = "test1";
    public static final String CONTENT = "test1_content";
    public static final int RUID = 1;
    public static final GeneralElement TAG_1 = new GeneralElement(1, "tag_1");
    public static final GeneralElement TAG_2 = new GeneralElement(1, "tag_5");
    private static final Ingredient INGREDIENT_1 = new Ingredient(1, "ing_1", "amount_1");

    private static final int RATING = 1;
    public static final String RATING_STRING = "1 / 5 stars";
    private static final ArrayList<Ingredient> INGREDIENTS = new ArrayList<>();
    private static final ArrayList<GeneralElement> TAGS = new ArrayList<>();
    public static final String RATING_STRING_UPDATED = "2 / 5 stars";
    private static final String COMMENT = "test1_comment";


    private static final PresentationRecipe PRESENTATION_RECIPE = new PresentationRecipe(
            NAME,
            CONTENT,
            RUID,
            TAGS,
            INGREDIENTS,
            RATING,
            COMMENT,
            null,
            false);


    public RecipeUtils() {
        if (INGREDIENTS.size() == 0)
            INGREDIENTS.add(INGREDIENT_1);

        if (TAGS.size() == 0) {
            TAGS.add(TAG_1);
            TAGS.add(TAG_2);
        }
    }

    public static void navigateToRecipe(int position) {
        onView(withId(R.id.button)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(position).perform(click());
    }

    public static void resetRecipe() {
        onView(withId(R.id.deleteButton)).perform(ViewActions.scrollTo(), click());
    }

    public PresentationRecipe getPresentationRecipe() {
        return PRESENTATION_RECIPE;
    }


    public void assertRecipe() {
        onView(withId(R.id.Content)).check(matches(withText(CONTENT)));
        onView(withId(R.id.recipeViewTitle)).check(matches(withText(NAME)));
        onView(withId(R.id.Ingredients)).check(matches(withText(getIngredientStrings())));
        onData(anything()).inAdapterView(withId(R.id.tagGrid)).atPosition(0).check(matches(withText(TAG_1.getName())));
        onData(anything()).inAdapterView(withId(R.id.tagGrid)).atPosition(1).check(matches(withText(TAG_2.getName())));
        onView(withId(R.id.commentView)).perform(scrollTo()).check(matches(withText(COMMENT)));
    }

    public void assertRecipe1Star() {
        onView(withId(R.id.rating)).check(matches(withText(RATING_STRING)));
        assertRecipe();
    }


    private String getIngredientStrings() {
        StringBuilder ingredientList = new StringBuilder();
        for (Ingredient i : INGREDIENTS) {
            ingredientList.append(" ").append(i.getAmount()).append(" ").append(i.getName()).append("    ");
        }
        return ingredientList.toString();
    }

    public static void addRecipe() {
        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editName)).perform(clearText());
        onView(withId(R.id.editName)).perform(typeText(NAME));

        onView(withId(R.id.editAmount)).perform(clearText());
        onView(withId(R.id.editIngredient)).perform(clearText());

        onView(withId(R.id.editAmount)).perform(typeText(INGREDIENT_1.getAmount()));
        onView(withId(R.id.editIngredient)).perform(typeText(INGREDIENT_1.getName()));
        onView(withId(R.id.addIngredient)).perform(click());

        Espresso.closeSoftKeyboard();
        onView(withId(R.id.editTag)).perform(clearText());
        onView(withId(R.id.editTag)).perform(typeText(TAG_1.getName()));
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addTag)).perform(click());


        onView(withId(R.id.editTag)).perform(clearText());
        onView(withId(R.id.editTag)).perform(typeText(TAG_2.getName()));
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addTag)).perform(click());


        onView(withId(R.id.editContent)).perform(clearText());
        onView(withId(R.id.editContent)).perform(typeText(CONTENT));
        Espresso.closeSoftKeyboard();

        onView(withId(R.id.editComment)).perform(clearText());
        onView(withId(R.id.editComment)).perform(typeText(COMMENT));
        Espresso.closeSoftKeyboard();

        onView(withId(R.id.addToCollection)).perform(click());
    }

}
