package comp3350.chefs_collection.IntegrationTest;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

import comp3350.chefs_collection.Logic.AccessExternalPersistence;
import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalFileExpection;
import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalPersistence;
import comp3350.chefs_collection.Persistence.ExternalInterface;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;


public class ExternalPersistenceTest {
    private final JsonParser parser = new JsonParser();
    private final Gson gson = new Gson();
    private AccessExternalPersistence accessExternalPersistence;

    @Before
    public void initial() {
        String test = "{\"ingredient\":[{\"RUID\":1,\"amount\":\"amount_1\",\"name\":\"ing_1\"}],\"tags\":[{\"name\":\"tag_1\",\"uid\":1},{\"name\":\"tag_5\",\"uid\":1}],\"UID\":1,\"comment\":\"test1_comment\",\"content\":\"test1_content\",\"history\":\"Mar 31, 2019 4:20:16 AM\",\"isDisplay\":true,\"name\":\"test1\",\"rating\":1}";
        Gson gson = new Gson();
        ExternalInterface externalInterface = new ExternalPersistence(".");
        accessExternalPersistence = new AccessExternalPersistence(externalInterface);
        PresentationRecipe recipe = gson.fromJson(test, PresentationRecipe.class);
        try {
            Writer writer = new FileWriter(new File("dummyRecipeList.recipe"));
            gson.toJson(recipe, writer);
            writer.close();
        } catch (IOException e) {
            System.out.println("file write error");
        }

    }

    @Rule
    public TestRule watcher = new TestWatcher() {
        protected void starting(Description description) {
            System.out.println("Starting test: " + description.getMethodName());
        }
    };

    @After
    public void end() {
        File path = new File("dummyRecipeList.recipe");
        path.delete();
    }


    @Test
    public void saveRecipeList() {
        String test = "{\"ingredient\":[{\"RUID\":1,\"amount\":\"amount_1\",\"name\":\"ing_1\"}],\"tags\":[{\"name\":\"tag_1\",\"uid\":1},{\"name\":\"tag_5\",\"uid\":1}],\"UID\":1,\"comment\":\"test1_comment\",\"content\":\"test1_content\",\"history\":\"Mar 31, 2019 4:20:16 AM\",\"isDisplay\":true,\"name\":\"test1\",\"rating\":1}";
        Gson gson = new Gson();
        PresentationRecipe recipe = gson.fromJson(test, PresentationRecipe.class);
        accessExternalPersistence.saveRecipeList(new File("dummyRecipeList.recipe"), recipe);
        PresentationRecipe list = accessExternalPersistence.loadRecipe(new File("dummyRecipeList.recipe"));
        assertEquals("recipe load error", recipe, list);
    }

    @Test
    public void loadRecipeList() throws ExternalFileExpection {


        PresentationRecipe list = accessExternalPersistence.loadRecipe(new File("dummyRecipeList.recipe"));
        String assume = "{\"ingredient\":[{\"RUID\":1,\"amount\":\"amount_1\",\"name\":\"ing_1\"}],\"tags\":[{\"name\":\"tag_1\",\"uid\":1},{\"name\":\"tag_5\",\"uid\":1}],\"UID\":1,\"comment\":\"test1_comment\",\"content\":\"test1_content\",\"history\":\"Mar 31, 2019 4:20:16 AM\",\"isDisplay\":true,\"name\":\"test1\",\"rating\":1}";
        JsonElement assumeInput = parser.parse(assume);
        JsonElement actual = parser.parse(gson.toJson(list, PresentationRecipe.class));
        assertEquals(assumeInput, actual);
    }

    @Test
    public void getDirectoryTest() {
        assertNotNull("directory test fail", accessExternalPersistence.getDirectoryList(new File("")));
    }

    @Test
    public void getFileTest() {

        assertNotNull("file test fail", accessExternalPersistence.getRecipeList(new File("")));
    }

}
