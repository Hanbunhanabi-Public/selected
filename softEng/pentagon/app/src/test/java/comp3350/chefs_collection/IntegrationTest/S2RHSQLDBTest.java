package comp3350.chefs_collection.IntegrationTest;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;

import java.io.File;
import java.util.ArrayList;

import comp3350.chefs_collection.Application.Main;
import comp3350.chefs_collection.Logic.AccessSubList2Recipe;
import comp3350.chefs_collection.Objects.SubListToRecipe;
import comp3350.chefs_collection.Persistence.hsqldb.SubList2RecipeHSQLDB;
import comp3350.chefs_collection.utils.TestUtils;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class S2RHSQLDBTest {

    private AccessSubList2Recipe accessS2R;
    private File tempDB;

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @Before
    public void setup() throws Exception {
        this.tempDB = TestUtils.copyDB();
        this.accessS2R =
                new AccessSubList2Recipe(new SubList2RecipeHSQLDB(Main.getDBPathName()));

    }

    @After
    public void tearDown() {
        accessS2R = null;
        tempDB.delete();
    }

    @Test
    public void testFetchAllElementBySUID() {
        ArrayList<SubListToRecipe> list = (ArrayList<SubListToRecipe>) accessS2R.fetchAllElementBySUID(1);
        assertEquals("fetch by suid fail", 2, list.size());
    }


    @Test
    public void testAddElement() {
        SubListToRecipe s2R = new SubListToRecipe(2, 1);
        assertTrue(accessS2R.addElement(s2R));
        ArrayList<SubListToRecipe> list = (ArrayList<SubListToRecipe>) accessS2R.fetchAllElementBySUID(1);
        assertEquals("add element fail", 2, list.size());
    }

    @Test
    public void testDeleteElement() {
        SubListToRecipe s2R = new SubListToRecipe(1, 1);
        assertTrue(accessS2R.deleteElement(s2R));
        ArrayList<SubListToRecipe> list = (ArrayList<SubListToRecipe>) accessS2R.fetchAllElementBySUID(1);
        assertEquals("delete fail", 1, list.size());
    }

}
