package comp3350.chefs_collection;

import android.support.test.espresso.Espresso;
import android.support.test.espresso.action.ViewActions;
import android.support.test.filters.LargeTest;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.junit.runner.RunWith;

import comp3350.chefs_collection.Presentation.MainActivity;

import static android.support.test.espresso.Espresso.onData;
import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.clearText;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.action.ViewActions.typeText;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.isRoot;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static comp3350.chefs_collection.utils.RecipeUtils.CONTENT;
import static comp3350.chefs_collection.utils.RecipeUtils.NAME;
import static comp3350.chefs_collection.utils.RecipeUtils.RATING_STRING;
import static comp3350.chefs_collection.utils.RecipeUtils.TAG_1;
import static comp3350.chefs_collection.utils.RecipeUtils.TAG_2;
import static org.hamcrest.CoreMatchers.anything;



@RunWith(AndroidJUnit4.class)
@LargeTest
public class BrowseSublistTest {

    @Rule
    public ActivityTestRule<MainActivity> activityTestRule = new ActivityTestRule<>(MainActivity.class);

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @Test
    public void testBrowseSubList() {
        onView(withId(R.id.viewSublist)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist1")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist2")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.sublist_name))
                .perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.S2R_name))
                .check(matches(withText("test1")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.S2R_name))
                .check(matches(withText("test2")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.S2R_name))
                .perform(click());
        onView(withId(R.id.Content)).check(matches(withText(CONTENT)));
        onView(withId(R.id.rating)).check(matches(withText(RATING_STRING)));
        onView(withId(R.id.recipeViewTitle)).check(matches(withText(NAME)));
        onData(anything()).inAdapterView(withId(R.id.tagGrid)).atPosition(0).check(matches(withText(TAG_1.getName())));
        onData(anything()).inAdapterView(withId(R.id.tagGrid)).atPosition(1).check(matches(withText(TAG_2.getName())));
    }

    @Test
    public void testDeleteSubList() {
        onView(withId(R.id.viewSublist)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.remove_sublist))
                .perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist1")));
        onView(isRoot()).perform(ViewActions.pressBack());
        restoreDeleteSubList();
        onView(withId(R.id.viewSublist)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist2")));
    }

    @Test
    public void testAddRecipeToSublist() {
        onView(withId(R.id.button)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView))
                .atPosition(0).onChildView(withId(R.id.recipe_name))
                .perform(click());
        onView(withId(R.id.goToAdd2Sub)).perform(ViewActions.scrollTo(), click());
        onData(anything()).inAdapterView(withId(R.id.add2SubListView))
                .atPosition(0).onChildView(withId(R.id.add2listbutton))
                .perform(click());
        onData(anything()).inAdapterView(withId(R.id.add2SubListView))
                .atPosition(1).onChildView(withId(R.id.add2listbutton))
                .perform(click());
        onView(isRoot()).perform(ViewActions.pressBack());
        onView(isRoot()).perform(ViewActions.pressBack());

        onView(withId(R.id.viewSublist)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist1")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.sublist_name))
                .perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.S2R_name))
                .check(matches(withText("test1")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.S2R_name))
                .check(matches(withText("test2")));

        onView(isRoot()).perform(ViewActions.pressBack());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist2")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.sublist_name))
                .perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(0).onChildView(withId(R.id.S2R_name))
                .check(matches(withText("test3")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.S2R_name))
                .check(matches(withText("test4")));
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(2).onChildView(withId(R.id.S2R_name))
                .check(matches(withText("test1")));


        // used for clean up
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(2).onChildView(withId(R.id.remove_S2R))
                .perform(click());
    }

    @Test
    public void testAddSublist() {
        onView(withId(R.id.addSublist)).perform(click());
        onView(withId(R.id.editSublist)).perform(clearText());
        onView(withId(R.id.addToSublists)).perform(click());
        onView(withId(R.id.viewSublist)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist2")));
        Espresso.pressBack();

        onView(withId(R.id.addSublist)).perform(click());
        onView(withId(R.id.editSublist)).perform(clearText());
        onView(withId(R.id.editSublist)).perform(typeText("012345678901234567890"));
        onView(withId(R.id.addToSublists)).perform(click());
        onView(withId(R.id.viewSublist)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(1).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist2")));
        Espresso.pressBack();

        onView(withId(R.id.addSublist)).perform(click());
        onView(withId(R.id.editSublist)).perform(clearText());
        onView(withId(R.id.editSublist)).perform(typeText("sublist3"));
        onView(withId(R.id.addToSublists)).perform(click());
        onView(withId(R.id.viewSublist)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(2).onChildView(withId(R.id.sublist_name))
                .check(matches(withText("sublist3")));


        onData(anything()).inAdapterView(withId(R.id.sublistView))
                .atPosition(2).onChildView(withId(R.id.remove_sublist))
                .perform(click());

    }


    public void restoreDeleteSubList() {
        onView(withId(R.id.addSublist)).perform(click());
        onView(withId(R.id.editSublist)).perform(clearText());
        onView(withId(R.id.editSublist)).perform(typeText("sublist2"));

        onView(withId(R.id.addToSublists)).perform(click());

        onView(withId(R.id.button)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView))
                .atPosition(2).onChildView(withId(R.id.recipe_name))
                .perform(click());
        onView(withId(R.id.goToAdd2Sub)).perform(ViewActions.scrollTo(), click());
        onData(anything()).inAdapterView(withId(R.id.add2SubListView))
                .atPosition(1).onChildView(withId(R.id.add2listbutton))
                .perform(click());
        onView(isRoot()).perform(ViewActions.pressBack());
        onView(isRoot()).perform(ViewActions.pressBack());

        onView(withId(R.id.button)).perform(click());
        onData(anything()).inAdapterView(withId(R.id.recipeListView))
                .atPosition(3).onChildView(withId(R.id.recipe_name))
                .perform(click());
        onView(withId(R.id.goToAdd2Sub)).perform(ViewActions.scrollTo(), click());
        onData(anything()).inAdapterView(withId(R.id.add2SubListView))
                .atPosition(1).onChildView(withId(R.id.add2listbutton))
                .perform(click());

        onView(isRoot()).perform(ViewActions.pressBack());
        onView(isRoot()).perform(ViewActions.pressBack());
    }


}

