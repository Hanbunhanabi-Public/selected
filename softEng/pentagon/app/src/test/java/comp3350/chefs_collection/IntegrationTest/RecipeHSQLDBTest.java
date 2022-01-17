package comp3350.chefs_collection.IntegrationTest;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import comp3350.chefs_collection.Application.Main;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Persistence.hsqldb.RecipeHSQLDB;
import comp3350.chefs_collection.utils.TestUtils;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class RecipeHSQLDBTest {
    private AccessRecipe accessRecipe;
    private File tempDB;

    @Before
    public void setup() throws IOException {
        this.tempDB = TestUtils.copyDB();
        this.accessRecipe =
                new AccessRecipe(new RecipeHSQLDB(Main.getDBPathName()));
    }

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @After
    public void tearDown() {
        System.out.println("done");
        accessRecipe = null;
        tempDB.delete();
    }

    @Test
    public void testFetchRecipe() {
        ArrayList<Recipe> recipes = (ArrayList<Recipe>) accessRecipe.fetchAllRecipe();
        assertEquals("fetch all recipe fail", 4, recipes.size());
    }


    @Test
    public void testFetchAllHistory() {
        ArrayList<Integer> indexes = (ArrayList<Integer>) accessRecipe.fetchAllHistory();
        assertEquals("fetch all access record fail", 0, indexes.size());
    }

    @Test
    public void testUpdateHistory() {
        ArrayList<Recipe> recipes = (ArrayList<Recipe>) accessRecipe.fetchAllRecipe();
        assertTrue("recipe history update error", accessRecipe.updateHistory(recipes.get(0)));
        assertTrue("recipe history update error", accessRecipe.updateHistory(recipes.get(1)));
        ArrayList<Integer> indexes = (ArrayList<Integer>) accessRecipe.fetchAllHistory();
        assertEquals("test update fail", 2, indexes.size());
    }

    @Test
    public void testRemoveHistory() {
        ArrayList<Recipe> recipes = (ArrayList<Recipe>) accessRecipe.fetchAllRecipe();
        assertTrue("history update error", accessRecipe.updateHistory(recipes.get(0)));
        assertTrue("history update error", accessRecipe.updateHistory(recipes.get(1)));
        assertTrue("history remove error", accessRecipe.removeHistory(recipes.get(1).getUID()));
        ArrayList<Integer> indexes = (ArrayList<Integer>) accessRecipe.fetchAllHistory();
        assertEquals("remove history fail", 1, indexes.size());
    }

    @Test
    public void testGetRecipe() {
        Recipe temp = new Recipe("test1", "test1_content", 1, 1, "test1_commet", null, false);
        Recipe recipe = accessRecipe.getRecipe(1);
        assertEquals("get recipe  fail", temp, recipe);
    }

    @Test
    public void testAddrecipe() {
        Recipe recipe5 = new Recipe("test5", "test5_content", 1, "test5_commit", null, false);

        System.out.println(accessRecipe.addRecipe(recipe5));
        ArrayList<Recipe> recipes = (ArrayList<Recipe>) accessRecipe.fetchAllRecipe();

        assertEquals("add recipe fail", 5, recipes.size());
    }


    @Test
    public void testDeleteRecipe() {
        ArrayList<Recipe> recipes = (ArrayList<Recipe>) accessRecipe.fetchAllRecipe();
        System.out.println(accessRecipe.deleteRecipe(recipes.get(2)));
        recipes = (ArrayList<Recipe>) accessRecipe.fetchAllRecipe();
        assertEquals("delete recipe fail", 3, recipes.size());
        Recipe recipe5 = new Recipe("test5", "test5_content", 1, "test5_commit", null, false);
        assertFalse("delete recipe fail", accessRecipe.deleteRecipe(recipe5));
    }

    @Test
    public void testUpdateRecipe() {
        Recipe recipe5 = new Recipe("test1_new", "test1_content_new", 1, 1, "test5_commit_new", null, false);
        accessRecipe.updateRecipe(recipe5);
        ArrayList<Recipe> recipes = (ArrayList<Recipe>) accessRecipe.fetchAllRecipe();
        assertEquals("update recipe fail", 4, recipes.size());
    }

}
