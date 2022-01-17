package comp3350.chefs_collection;

import android.os.Environment;
import android.support.test.espresso.Espresso;
import android.support.test.espresso.NoMatchingViewException;
import android.support.test.filters.LargeTest;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.junit.runner.RunWith;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

import comp3350.chefs_collection.Logic.AccessExternalPersistence;
import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalPersistence;
import comp3350.chefs_collection.Persistence.ExternalInterface;
import comp3350.chefs_collection.Presentation.MainActivity;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;
import comp3350.chefs_collection.utils.RecipeUtils;

import static android.support.test.espresso.Espresso.onData;
import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.action.ViewActions.scrollTo;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.RootMatchers.withDecorView;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.CoreMatchers.anything;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.junit.Assert.assertEquals;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class ExternalStorageAccessTest {

    private RecipeUtils recipeUtils;
    private static final String root = Environment.getExternalStorageDirectory().toString();
    private File recipe;
    private AccessExternalPersistence accessExternalPersistence;
    @Rule
    public final ActivityTestRule<MainActivity> activityTestRule = new ActivityTestRule<>(MainActivity.class);

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @Before
    public void setUp() {

        this.recipeUtils = new RecipeUtils();
        ExternalInterface externalInterface = new ExternalPersistence(root);
        accessExternalPersistence = new AccessExternalPersistence(externalInterface);
        String root = Environment.getExternalStorageDirectory().toString();
        recipe = new File(root, "Download/" + RecipeUtils.NAME + "_" + RecipeUtils.RUID + ".recipe");

    }

    @Test
    public void validFileExploreTest() {
        onView(withId(R.id.LoadRecipe)).perform(click());

        try {
            onView(withText("Error: Require storage access permission")).inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
        } catch (NoMatchingViewException e) {
            accessExternalPersistence.saveRecipeList(recipe, recipeUtils.getPresentationRecipe());
            onData(anything()).inAdapterView(withId(R.id.directories)).atPosition(7).perform(click());
            onData(anything()).inAdapterView(withId(R.id.files)).atPosition(0).perform(click());
            onView(withText("Recipe add successful")).inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
            Espresso.pressBack();
            Espresso.pressBack();
            RecipeUtils.navigateToRecipe(4);
            recipeUtils.assertRecipe1Star();
            RecipeUtils.resetRecipe();
        } finally {
            recipe.delete();
        }
    }

    @Test
    public void emptyFileExploreTest() throws IOException {
        onView(withId(R.id.LoadRecipe)).perform(click());

        try {
            onView(withText("Error: Require storage access permission")).inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
        } catch (NoMatchingViewException e) {
            recipe.createNewFile();
            onData(anything()).inAdapterView(withId(R.id.directories)).atPosition(7).perform(click());
            onData(anything()).inAdapterView(withId(R.id.files)).atPosition(0).perform(click());
            onView(withText("Error: invalid file")).inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));

        } finally {
            recipe.delete();
        }
    }

    @Test
    public void invalidFileExploreTest() throws IOException {



        onView(withId(R.id.LoadRecipe)).perform(click());
        try {
            onView(withText("Error: Require storage access permission")).inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
        } catch (NoMatchingViewException e) {
            String testString = "{}";
            Writer writer = new FileWriter(recipe);
            Gson gson = new GsonBuilder().create();
            gson.toJson(testString, writer);
            writer.close();

            onData(anything()).inAdapterView(withId(R.id.directories)).atPosition(7).perform(click());
            onData(anything()).inAdapterView(withId(R.id.files)).atPosition(0).perform(click());
            onView(withText("Error: invalid file")).inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));

        } finally {
            recipe.delete();
        }
    }
    @Test
    public void exportRecipeTest() {
        onView(withId(R.id.button)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView)).atPosition(0).perform(click());
        onView(withId(R.id.button3)).perform(scrollTo(), click());
        try {
            onView(withText("Error: Require storage access permission")).
                    inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));
        } catch (NoMatchingViewException e) {

            onData(anything()).inAdapterView(withId(R.id.directories)).atPosition(7).perform(click());
            onView(withId(R.id.save)).perform(click());
            onView(withText(RecipeUtils.NAME + "_" + RecipeUtils.RUID + ".recipe saved successful"))
                    .inRoot(withDecorView(not(is(activityTestRule.getActivity().getWindow().getDecorView())))).check(matches(isDisplayed()));

            PresentationRecipe saved = accessExternalPersistence.loadRecipe(recipe);
            assertEquals(recipeUtils.getPresentationRecipe(), saved);

        } finally {
            recipe.delete();
        }

    }


}