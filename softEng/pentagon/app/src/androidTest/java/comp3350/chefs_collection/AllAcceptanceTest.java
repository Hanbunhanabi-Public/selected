package comp3350.chefs_collection;


import org.junit.runner.RunWith;
import org.junit.runners.Suite;


@RunWith(Suite.class)
@Suite.SuiteClasses({
        RecipeFeaturesTest.class,
        BrowseRecipeTest.class,
        BrowseSublistTest.class,
        ExternalStorageAccessTest.class,
        HistoryTest.class,
        SearchRecipeTest.class,
        SearchByTagTest.class

})

public class AllAcceptanceTest {

}
