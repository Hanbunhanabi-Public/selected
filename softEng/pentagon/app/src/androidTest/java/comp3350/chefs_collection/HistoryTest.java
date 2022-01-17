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

import static android.support.test.espresso.Espresso.onData;
import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.CoreMatchers.anything;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class HistoryTest {
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
    public void testViewHistory() {
        RecipeUtils.navigateToRecipe(0);
        Espresso.pressBack();

        onView(withId(R.id.historyButton)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(0).onChildView(withId(R.id.history_name)).check(matches(withText(RecipeUtils.NAME)));

    }

    @Test
    public void testViewHistoryLink() {
        RecipeUtils.navigateToRecipe(0);
        Espresso.pressBack();
        onView(withId(R.id.historyButton)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(0).perform(click());
        recipeUtils.assertRecipe();
    }

    @Test
    public void testDeleteHistoy() {
        RecipeUtils.navigateToRecipe(0);
        Espresso.pressBack();
        onView(withId(R.id.historyButton)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(0).onChildView(withId(R.id.remove_history)).perform(click());

    }

}
