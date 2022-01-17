package comp3350.chefs_collection;

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
import comp3350.chefs_collection.utils.CountHelper;
import comp3350.chefs_collection.utils.RecipeUtils;

import static android.support.test.espresso.Espresso.onData;
import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.CoreMatchers.anything;
import static org.junit.Assert.assertEquals;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class BrowseRecipeTest {
    private RecipeUtils recipeUtils;
    @Rule
    public ActivityTestRule<MainActivity> activityTestRule = new ActivityTestRule<>(MainActivity.class);
    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };


    @Before
    public void setUp() {
        this.recipeUtils = new RecipeUtils();
    }

    @Test
    public void testBrowseRecipeList() {
        onView(withId(R.id.button)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(0).onChildView(withId(R.id.recipe_name)).check(matches(withText("test1")));
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(1).onChildView(withId(R.id.recipe_name)).check(matches(withText("test2")));
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(2).onChildView(withId(R.id.recipe_name)).check(matches(withText("test3")));
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(3).onChildView(withId(R.id.recipe_name)).check(matches(withText("test4")));

    }

    @Test
    public void testUpdateRecipe() {
        RecipeUtils.navigateToRecipe(0);
        onView(withId(R.id.star2)).perform(click());
        onView(withId(R.id.rating)).check(matches(withText(RecipeUtils.RATING_STRING_UPDATED)));
        onView(withId(R.id.star1)).perform(click());
    }

    @Test
    public void testBrowseRecipe() {
        RecipeUtils.navigateToRecipe(0);
        recipeUtils.assertRecipe();

    }

    @Test
    public void testDeleteRecipe() {
        RecipeUtils.addRecipe();
        RecipeUtils.navigateToRecipe(4);
        RecipeUtils.resetRecipe();
        onView(withId(R.id.button)).perform(click());
        assertEquals(4, CountHelper.getCountFromListUsingTypeSafeMatcher(R.id.recipeListView));
    }
}
