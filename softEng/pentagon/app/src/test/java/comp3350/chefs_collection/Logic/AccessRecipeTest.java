package comp3350.chefs_collection.Logic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Persistence.RecipeInterface;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertNotSame;
import static junit.framework.Assert.assertNull;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class AccessRecipeTest {
    private AccessRecipe accessRecipe;
    private RecipeInterface recipeInterface;
    private Recipe recipe1;
    private Recipe recipe2;
    private Recipe recipe3;
    private Recipe recipe4;
    private List<Recipe> list1;
    private List<Recipe> list2;


    @Before
    public void setup() {
        this.recipeInterface = mock(RecipeInterface.class);
        this.accessRecipe = new AccessRecipe(recipeInterface);
        Calendar cal = Calendar.getInstance();
        this.list1 = new ArrayList<>();
        this.list2 = new ArrayList<>();

        this.recipe1 = new Recipe("test1", "test1_content", 1, 1, "test1_commit", new java.sql.Timestamp(cal.getTimeInMillis()), false);
        this.recipe2 = new Recipe("test2", "test2_content", 2, 1, "test2_commit", new java.sql.Timestamp(cal.getTimeInMillis()), false);
        this.recipe3 = new Recipe("test3", "test3_content", 3, 1, "test3_commit", null, false);
        this.recipe4 = new Recipe("test4", "test4_content", 4, 1, "test4_commit", new java.sql.Timestamp(cal.getTimeInMillis()), false);
        Recipe recipe5 = new Recipe("test5", "test5_content", 1, "test5_commit", null, false);
        this.list1.add(recipe1);
        this.list1.add(recipe2);
        this.list1.add(recipe3);
        this.list1.add(recipe4);
        this.list1.add(recipe5);
        this.list2.add(recipe1);
        this.list2.add(recipe2);
        this.list2.add(recipe3);
        this.list2.add(recipe4);
    }

    @After
    public void cleanUp() {
        accessRecipe = null;
    }

    @Test
    public void testFetchAllRecipe() {
        System.out.println("Start of test fetch all method");
        when(recipeInterface.fetchAllRecipe()).thenReturn(list1);
        assertEquals(list1, accessRecipe.fetchAllRecipe());
        verify(recipeInterface).fetchAllRecipe();
        System.out.println("End of test fetch all method");
    }

    @Test
    public void testGetRecipe() {
        System.out.println("Start of testing get recipe method.");
        List<Recipe> resultList = new ArrayList<>();
        when(recipeInterface.getRecipe(1)).thenReturn(recipe1);
        when(recipeInterface.getRecipe(2)).thenReturn(recipe2);
        when(recipeInterface.getRecipe(3)).thenReturn(recipe3);
        when(recipeInterface.getRecipe(4)).thenReturn(recipe4);

        resultList.add(accessRecipe.getRecipe(1));
        resultList.add(accessRecipe.getRecipe(2));
        resultList.add(accessRecipe.getRecipe(3));
        resultList.add(accessRecipe.getRecipe(4));

        assertEquals(resultList, list2);
        assertNull(accessRecipe.getRecipe(5));

        verify(recipeInterface).getRecipe(1);
        verify(recipeInterface).getRecipe(2);
        verify(recipeInterface).getRecipe(3);
        verify(recipeInterface).getRecipe(4);
        System.out.println("End of testing get recipe method.");
    }

    @Test
    public void testFetchRecipes() {
        System.out.println("Start of Test fetch recipe (list)method for access recipe class.");
        List<Integer> listIn = new ArrayList<>();
        listIn.add(1);
        listIn.add(2);
        listIn.add(3);
        listIn.add(4);

        List<Recipe> resultList = new ArrayList<>();
        when(recipeInterface.getRecipe(1)).thenReturn(recipe1);
        when(recipeInterface.getRecipe(2)).thenReturn(recipe2);
        when(recipeInterface.getRecipe(3)).thenReturn(recipe3);
        when(recipeInterface.getRecipe(4)).thenReturn(recipe4);
        resultList = accessRecipe.fetchRecipes(listIn);
        assertEquals("fetch list error", 4, resultList.size());

        verify(recipeInterface).getRecipe(1);
        verify(recipeInterface).getRecipe(2);
        verify(recipeInterface).getRecipe(3);
        verify(recipeInterface).getRecipe(4);
        System.out.println("End of Test fetch recipe (list)method for access recipe class.");
    }

    @Test
    public void testAddRecipe() {
        System.out.println("Start of test add recipe method");
        when(recipeInterface.addRecipe(recipe1)).thenReturn(1);
        assertEquals(accessRecipe.addRecipe(recipe1), 1);
        verify(recipeInterface).addRecipe(recipe1);

        System.out.println("End of test add recipe method");
    }

    @Test
    public void testDeleteRecipe() {
        System.out.println("Start of testing delete recipe function");

        when(recipeInterface.deleteRecipe(recipe1)).thenReturn(true);
        assertTrue(accessRecipe.deleteRecipe(recipe1));
        assertFalse(accessRecipe.deleteRecipe(recipe2));
        verify(recipeInterface).deleteRecipe(recipe1);
        System.out.println("End of testing delete recipe function");
    }


    @Test
    public void testUpdateRecipe() {
        System.out.println("Start of testing update recipe function.");

        when(recipeInterface.updateRecipe(recipe1)).thenReturn(true);
        assertTrue(accessRecipe.updateRecipe(recipe1));
        assertFalse(accessRecipe.updateRecipe(recipe2));
        verify(recipeInterface).updateRecipe(recipe1);
        System.out.println("End of testing update recipe function.");
    }

    @Test
    public void testUpdateHistory() {
        System.out.println("Start of testing update history function.");

        when(recipeInterface.updateHistory(recipe1)).thenReturn(true);
        assertTrue(accessRecipe.updateHistory(recipe1));
        assertFalse(accessRecipe.updateHistory(recipe2));
        verify(recipeInterface).updateHistory(recipe1);


        System.out.println("End of testing update history function.");
    }


    @Test
    public void testRemoveHistory() {
        System.out.println("Start of testing remove history function.");

        when(recipeInterface.removeHistory(1)).thenReturn(true);
        assertTrue(accessRecipe.removeHistory(1));
        assertNotSame(accessRecipe.removeHistory(2), true);
        verify(recipeInterface).removeHistory(1);
        verify(recipeInterface).removeHistory(2);
        System.out.println("End of testing remove history function.");
    }

    @Test
    public void testFetchAllHistory() {
        System.out.println("Start of testing Fetching all history record.");
        List<Integer> result = new ArrayList<>();
        result.add(1);
        result.add(2);

        when(recipeInterface.fetchAllHistory()).thenReturn(result);
        assertEquals(accessRecipe.fetchAllHistory(), result);
        verify(recipeInterface).fetchAllHistory();
        System.out.println("End of testing Fetching all history record.");
    }



}
