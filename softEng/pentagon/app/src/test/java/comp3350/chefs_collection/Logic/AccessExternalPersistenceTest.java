package comp3350.chefs_collection.Logic;

import com.google.gson.Gson;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.File;
import java.util.ArrayList;

import comp3350.chefs_collection.Persistence.ExternalInterface;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class AccessExternalPersistenceTest {

    private AccessExternalPersistence accessExternalPersistence;
    private ExternalInterface externalInterface;

    @Before
    public void initial() {

        this.externalInterface = mock(ExternalInterface.class);
        this.accessExternalPersistence = new AccessExternalPersistence(externalInterface);

    }

    @After
    public void end() {
        File path = new File("dummyRecipeList.recipe");
        path.delete();
        accessExternalPersistence = null;
    }


    @Test
    public void saveRecipeList() {
        String test = "{\"ingredient\":[{\"RUID\":1,\"amount\":\"amount_1\",\"name\":\"ing_1\"}],\"tags\":[{\"name\":\"tag_1\",\"uid\":1},{\"name\":\"tag_5\",\"uid\":1}],\"UID\":1,\"comment\":\"test1_comment\",\"content\":\"test1_content\",\"history\":\"Mar 31, 2019 4:20:16 AM\",\"isDisplay\":true,\"name\":\"test1\",\"rating\":1}";
        Gson gson = new Gson();
        PresentationRecipe recipe = gson.fromJson(test, PresentationRecipe.class);


        accessExternalPersistence.saveRecipeList(new File("dummyRecipeList.recipe"), recipe);
        verify(externalInterface).saveRecipeList(new File("dummyRecipeList.recipe"), recipe);
    }

    @Test
    public void loadRecipeList() {
        String test = "{\"ingredient\":[{\"RUID\":1,\"amount\":\"amount_1\",\"name\":\"ing_1\"}],\"tags\":[{\"name\":\"tag_1\",\"uid\":1},{\"name\":\"tag_5\",\"uid\":1}],\"UID\":1,\"comment\":\"test1_comment\",\"content\":\"test1_content\",\"history\":\"Mar 31, 2019 4:20:16 AM\",\"isDisplay\":true,\"name\":\"test1\",\"rating\":1}";
        Gson gson = new Gson();
        PresentationRecipe recipe = gson.fromJson(test, PresentationRecipe.class);

        when(externalInterface.loadRecipe(new File("dummyRecipeList.recipe"))).thenReturn(recipe);
        PresentationRecipe list = accessExternalPersistence.loadRecipe(new File("dummyRecipeList.recipe"));

        assertEquals(list, recipe);
        verify(externalInterface).loadRecipe(new File("dummyRecipeList.recipe"));
    }

    @Test
    public void getDirectoryTest() {
        ArrayList<File> files = new ArrayList<>();
        when(externalInterface.getDirectoryList(new File(""))).thenReturn(files);
        assertEquals("directory test fail", 0, accessExternalPersistence.getDirectoryList(new File("")).size());
        verify(externalInterface).getDirectoryList(new File(""));
    }

    @Test
    public void getFileTest() {
        ArrayList<File> files = new ArrayList<>();
        when(externalInterface.getRecipeList(new File(""))).thenReturn(files);
        assertEquals("file test fail", 0, accessExternalPersistence.getRecipeList(new File("")).size());
        verify(externalInterface).getRecipeList(new File(""));
    }

}
