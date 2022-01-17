package comp3350.chefs_collection;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import comp3350.chefs_collection.Logic.AccessExternalPersistenceTest;
import comp3350.chefs_collection.Logic.AccessIngredient2RecipeTest;
import comp3350.chefs_collection.Logic.AccessRecipeTest;
import comp3350.chefs_collection.Logic.AccessSubList2RecipeTest;
import comp3350.chefs_collection.Logic.AccessSubListTest;
import comp3350.chefs_collection.Logic.AccessTag2RecipeTest;
import comp3350.chefs_collection.Logic.AutomaticAddRecipeTest;

//import comp3350.chefs_collection.Logic.AssemblePresentRecipeTest;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        AccessIngredient2RecipeTest.class,
        AccessRecipeTest.class,
        AccessSubList2RecipeTest.class,
        AccessExternalPersistenceTest.class,
        AccessSubListTest.class,
        AccessTag2RecipeTest.class,
        AutomaticAddRecipeTest.class
})

public class AllUnitTests {


}
