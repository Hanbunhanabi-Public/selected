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
import static android.support.test.espresso.action.ViewActions.typeText;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static junit.framework.TestCase.assertEquals;
import static org.hamcrest.CoreMatchers.anything;

@RunWith(AndroidJUnit4.class)
@LargeTest

public class SearchRecipeTest {
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
    public void testSearchRecipe() {
        onView(withId(R.id.searchButton)).perform(click());
        onView(withId(R.id.searchText)).perform(typeText("test1"));
        onView(withId(R.id.SearchButton)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(0).perform(click());
        recipeUtils.assertRecipe1Star();
    }

    @Test
    public void testSearchEmptyRecipe() {
        onView(withId(R.id.searchButton)).perform(click());
        onView(withId(R.id.SearchButton)).perform(click());
        assertEquals(0, CountHelper.getCountFromListUsingTypeSafeMatcher(R.id.recipeListView));

    }

}
