package comp3350.chefs_collection;

import android.support.test.espresso.Espresso;
import android.support.test.filters.LargeTest;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.junit.runner.RunWith;

import comp3350.chefs_collection.Presentation.MainActivity;
import comp3350.chefs_collection.utils.RecipeUtils;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.clearText;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.action.ViewActions.typeText;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.RootMatchers.withDecorView;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class RecipeFeaturesTest {
    private static final String errorMsg = "invalid recipe, add recipe fail";

    @Rule
    public final ActivityTestRule<MainActivity> activityTestRule = new ActivityTestRule<>(MainActivity.class);
    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };
    private static final String longString = "abcdefghijklmnopqrstuvwxyz";
    private RecipeUtils recipeUtils;
    @Before
    public void setUp() {

        this.recipeUtils = new RecipeUtils();
    }

    @Test
    public void testAddRecipe() {
        RecipeUtils.addRecipe();
        RecipeUtils.navigateToRecipe(4);
        recipeUtils.assertRecipe();
        onView(withId(R.id.rating)).check(matches(withText("NOT YET RATED")));
        RecipeUtils.resetRecipe();
    }

    @Test
    public void testAddInvalidEmptyNameRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editName)).perform(clearText());
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

    @Test
    public void testAddInvalidFullNameRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editName)).perform(clearText());
        onView(withId(R.id.editName)).perform(typeText(longString));
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

    @Test
    public void testAddInvalidEmptyIngNameRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editIngredient)).perform(clearText());
        onView(withId(R.id.addIngredient)).perform(click());
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

    @Test
    public void testAddInvalidFullIngNameRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editIngredient)).perform(clearText());
        onView(withId(R.id.addIngredient)).perform(click());
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

    @Test
    public void testAddInvalidEmptyIngAmountRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editAmount)).perform(clearText());

        onView(withId(R.id.addIngredient)).perform(click());
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

    @Test
    public void testAddInvalidFullTagNameRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editTag)).perform(clearText());
        onView(withId(R.id.addTag)).perform(click());
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

    @Test
    public void testAddInvalidEmptyTagNameRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editTag)).perform(clearText());
        onView(withId(R.id.editTag)).perform(typeText(longString));

        onView(withId(R.id.addTag)).perform(click());
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

    @Test
    public void testAddInvalidEmptyContentRecipe() {

        onView(withId(R.id.addRecipe)).perform(click());
        onView(withId(R.id.editTag)).perform(clearText());
        onView(withId(R.id.editContent)).perform(clearText());
        Espresso.closeSoftKeyboard();
        onView(withId(R.id.addToCollection)).perform(click());
        onView(withText(errorMsg)).
                inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
    }

}
