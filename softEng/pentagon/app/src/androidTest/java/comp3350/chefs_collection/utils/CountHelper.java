package comp3350.chefs_collection.utils;
/*this code is adapted modified from
https://stackoverflow.com/questions/30361068/assert-proper-number-of-items-in-list-with-espresso*/

import android.support.annotation.IdRes;
import android.view.View;
import android.widget.ListView;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.withId;

public class CountHelper {

    private static int count;

    public static int getCountFromListUsingTypeSafeMatcher(@IdRes int listViewId) {
        count = 0;

        Matcher matcher = new TypeSafeMatcher<View>() {
            @Override
            protected boolean matchesSafely(View item) {
                count = ((ListView) item).getCount();
                return true;
            }

            @Override
            public void describeTo(Description description) {
            }
        };

        onView(withId(listViewId)).check(matches(matcher));

        int result = count;
        count = 0;
        return result;
    }

}