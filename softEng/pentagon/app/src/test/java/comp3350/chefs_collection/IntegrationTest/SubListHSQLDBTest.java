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
import comp3350.chefs_collection.Logic.AccessSubList;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.hsqldb.SubListHSQLDB;
import comp3350.chefs_collection.utils.TestUtils;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertFalse;

public class SubListHSQLDBTest {
    private AccessSubList accessSubList;
    private File tempDB;

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @Before
    public void setup() throws IOException {
        this.tempDB = TestUtils.copyDB();
        this.accessSubList =
                new AccessSubList(new SubListHSQLDB(Main.getDBPathName()));
    }


    @After
    public void tearDown() {
        System.out.println("done!");
        accessSubList = null;
        tempDB.delete();
    }

    @Test
    public void testFetchAllElement() {
        ArrayList<GeneralElement> list = (ArrayList<GeneralElement>) accessSubList.fetchAllElement();
        assertEquals("fetch all element fail", 2, list.size());
    }

    @Test
    public void testGetElement() {
        GeneralElement temp = new GeneralElement(1, "sublist1");
        GeneralElement test = accessSubList.getElement(1);
        assertEquals("get element fail", temp, test);
    }


    @Test
    public void testDeleteElement() {
        GeneralElement test = new GeneralElement(1, "");
        assertTrue("sublist delete error", accessSubList.deleteElement(test));
        ArrayList<GeneralElement> list = (ArrayList<GeneralElement>) accessSubList.fetchAllElement();
        assertEquals("delete fail", 1, list.size());
    }

    @Test
    public void addElement() {
        GeneralElement test = new GeneralElement("newElement");
        assertTrue("add sublist error", accessSubList.addElement(test));
        assertFalse("add sublist error", accessSubList.addElement(test));
        ArrayList<GeneralElement> list = (ArrayList<GeneralElement>) accessSubList.fetchAllElement();
        assertEquals("add fail", 3, list.size());
    }


}
