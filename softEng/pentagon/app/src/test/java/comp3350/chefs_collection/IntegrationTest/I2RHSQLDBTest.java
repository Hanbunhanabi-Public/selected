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
import comp3350.chefs_collection.Logic.AccessIngredient2Recipe;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Persistence.hsqldb.Ingredient2RecipeHSQLDB;
import comp3350.chefs_collection.utils.TestUtils;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertFalse;

public class I2RHSQLDBTest {
    private File tempDB;
    private AccessIngredient2Recipe accessIngredient;

    @Before
    public void setup() throws IOException {
        this.tempDB = TestUtils.copyDB();
        this.accessIngredient =
                new AccessIngredient2Recipe(new Ingredient2RecipeHSQLDB(Main.getDBPathName()));
    }

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @After
    public void tearDown() {
        System.out.println("Done!");
        accessIngredient = null;
        System.out.println("clear " + tempDB.delete());
    }


    @Test
    public void testFetchIngredientSequenceByUID() {
        ArrayList<Ingredient> list = (ArrayList<Ingredient>) accessIngredient.fetchElementSequences(1);
        assertEquals("fetch by uid fail", 1, list.size());
    }


    @Test
    public void testAddElement() {
        Ingredient ingredient = new Ingredient(2, "ing_3", "amount_6");
        assertTrue("ingredient add error", accessIngredient.addElement(ingredient));
        assertFalse("ingredient add error", accessIngredient.addElement(ingredient));
        ArrayList<Ingredient> list = (ArrayList<Ingredient>) accessIngredient.fetchElementSequences(2);
        assertEquals("add element fail", 3, list.size());
    }


}


