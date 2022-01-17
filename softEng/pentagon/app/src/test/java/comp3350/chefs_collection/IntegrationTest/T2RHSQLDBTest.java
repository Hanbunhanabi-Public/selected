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
import comp3350.chefs_collection.Logic.AccessTag2Recipe;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.hsqldb.Tag2RecipeHSQLDB;
import comp3350.chefs_collection.utils.TestUtils;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class T2RHSQLDBTest {
    private File tempDB;
    private AccessTag2Recipe accessTags;

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @Before
    public void setup() throws IOException {

        this.tempDB = TestUtils.copyDB();
        this.accessTags =
                new AccessTag2Recipe(new Tag2RecipeHSQLDB(Main.getDBPathName()));
    }


    @After
    public void tearDown() {
        System.out.println("done!");
        accessTags = null;
        tempDB.delete();
    }

    @Test
    public void testFetchElementSequenceByUID() {
        ArrayList<GeneralElement> list = (ArrayList<GeneralElement>) accessTags.fetchElementSequences(1);
        assertEquals("fetch by uid fail", 2, list.size());
    }

    @Test
    public void testFetchElementSequenceByName() {
        ArrayList<GeneralElement> list = (ArrayList<GeneralElement>) accessTags.fetchElementSequences("tag_1");
        assertEquals("fetch by name fail", 1, list.size());
    }


    @Test
    public void testAddElement() {
        GeneralElement generalElement = new GeneralElement(1, "tag_2");
        assertTrue("tag add error", accessTags.addElement(generalElement));
        ArrayList<GeneralElement> list = (ArrayList<GeneralElement>) accessTags.fetchElementSequences(1);
        assertEquals("add fail", 3, list.size());
    }
}
