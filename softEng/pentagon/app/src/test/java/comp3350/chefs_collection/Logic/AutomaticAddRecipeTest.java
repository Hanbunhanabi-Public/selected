package comp3350.chefs_collection.Logic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import comp3350.chefs_collection.Logic.Exceptions.AmountException;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Persistence.Ingredient2RecipeInterface;
import comp3350.chefs_collection.Persistence.RecipeInterface;
import comp3350.chefs_collection.Persistence.Tag2RecipeInterface;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class AutomaticAddRecipeTest {
    private AutomaticAddRecipe automaticAddRecipe;
    private RecipeInterface recipeInterface;
    private Tag2RecipeInterface tag2RecipeInterface;
    private Ingredient2RecipeInterface ingredient2RecipeInterface;
    private GeneralElement generalElement1;
    private GeneralElement generalElement2;
    private PresentationRecipe presentationRecipe1;
    private Ingredient ingredient2;
    private Ingredient ingredient1;
    private PresentationRecipe presentationRecipe2;


    @Before
    public void startUp() {
        this.recipeInterface = mock(RecipeInterface.class);
        this.tag2RecipeInterface = mock(Tag2RecipeInterface.class);
        this.ingredient2RecipeInterface = mock(Ingredient2RecipeInterface.class);
        AccessRecipe accessRecipe = new AccessRecipe(recipeInterface);
        AccessIngredient2Recipe accessIngredient2Recipe = new AccessIngredient2Recipe(ingredient2RecipeInterface);
        AccessTag2Recipe accessTag2Recipe = new AccessTag2Recipe(tag2RecipeInterface);
        this.automaticAddRecipe = new AutomaticAddRecipe(accessRecipe, accessTag2Recipe, accessIngredient2Recipe);
        ArrayList<Ingredient> ingredientList = new ArrayList<>();
        ArrayList<GeneralElement> tagList = new ArrayList<>();

        Recipe testRecipe = new Recipe("test1", "test1_content", 1, 1, "test1_commit", null, false);
        Recipe testRecipe1 = new Recipe("", "test1_content", 1, 1, "test1_commit", null, false);
        this.ingredient1 = new Ingredient(1, "test1_ingredient", "test1_amount");
        this.ingredient2 = new Ingredient(1, "test1_ingredient_2", "test1_amount_2");

        this.generalElement1 = new GeneralElement(1, "Spicy");
        this.generalElement2 = new GeneralElement(1, "Oily");

        tagList.add(generalElement1);
        tagList.add(generalElement1);
        tagList.add(generalElement2);

        ingredientList.add(ingredient1);
        ingredientList.add(ingredient1);
        ingredientList.add(ingredient2);

        this.presentationRecipe1 = new PresentationRecipe(testRecipe.getName(),
                testRecipe.getContent(), testRecipe.getUID(), tagList,
                ingredientList, testRecipe.getRating(),
                testRecipe.getComment(), testRecipe.getHistory(), testRecipe.isDisplay());
        this.presentationRecipe2 = new PresentationRecipe(testRecipe1.getName(),
                testRecipe1.getContent(), testRecipe1.getUID(), tagList,
                ingredientList, testRecipe1.getRating(),
                testRecipe1.getComment(), testRecipe1.getHistory(), testRecipe1.isDisplay());

    }

    @After
    public void clear() {
        automaticAddRecipe = null;
    }

    @Test
    public void testAdd() {
        System.out.println("Start of test add function.");
        when(recipeInterface.addRecipe(presentationRecipe1)).thenReturn(1);
        when(ingredient2RecipeInterface.addElement(ingredient1)).thenReturn(true);
        when(ingredient2RecipeInterface.addElement(ingredient2)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement1)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement2)).thenReturn(true);
        when(recipeInterface.deleteRecipe(presentationRecipe1)).thenReturn(true);

        assertTrue(automaticAddRecipe.add(presentationRecipe1, presentationRecipe1.getIngredient(), presentationRecipe1.getTags()));

        verify(recipeInterface).addRecipe(presentationRecipe1);
        verify(ingredient2RecipeInterface).addElement(ingredient1);
        verify(ingredient2RecipeInterface).addElement(ingredient2);
        verify(tag2RecipeInterface).addElement(generalElement1);
        verify(tag2RecipeInterface).addElement(generalElement2);
        System.out.println("End of test add function.");
    }
    //
    @Test(expected = NameException.class)
    public void testAddRecipeNameException1() {
        System.out.println("Start of testing add recipe exception.");
        when(recipeInterface.addRecipe(presentationRecipe1)).thenReturn(1);
        when(ingredient2RecipeInterface.addElement(ingredient1)).thenReturn(true);
        when(ingredient2RecipeInterface.addElement(ingredient2)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement1)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement2)).thenReturn(true);

        automaticAddRecipe.add(presentationRecipe2, presentationRecipe2.getIngredient(), presentationRecipe2.getTags());

        verify(recipeInterface).addRecipe(presentationRecipe1);
        verify(ingredient2RecipeInterface).addElement(ingredient1);
        verify(ingredient2RecipeInterface).addElement(ingredient2);
        verify(tag2RecipeInterface).addElement(generalElement1);
        verify(tag2RecipeInterface).addElement(generalElement2);
        System.out.println("End of testing add recipe exception.");
    }

    @Test(expected = NameException.class)
    public void testAddRecipeNameException2() {
        System.out.println("Start of testing add recipe exception.");
        when(recipeInterface.addRecipe(presentationRecipe1)).thenReturn(1);
        when(ingredient2RecipeInterface.addElement(ingredient1)).thenReturn(true);
        when(ingredient2RecipeInterface.addElement(ingredient2)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement1)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement2)).thenThrow(NameException.class);

        automaticAddRecipe.add(presentationRecipe1, presentationRecipe1.getIngredient(), presentationRecipe1.getTags());

        verify(recipeInterface).addRecipe(presentationRecipe1);
        verify(ingredient2RecipeInterface).addElement(ingredient1);
        verify(ingredient2RecipeInterface).addElement(ingredient2);
        verify(tag2RecipeInterface).addElement(generalElement1);
        verify(tag2RecipeInterface).addElement(generalElement2);
        System.out.println("End of testing add recipe exception.");
    }

    @Test(expected = UIDException.class)
    public void testAddRecipeUidException1() {
        System.out.println("Start of testing add recipe exception.");
        when(recipeInterface.addRecipe(presentationRecipe1)).thenThrow(UIDException.class);
        when(ingredient2RecipeInterface.addElement(ingredient1)).thenReturn(true);
        when(ingredient2RecipeInterface.addElement(ingredient2)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement1)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement2)).thenReturn(true);

        assertTrue(automaticAddRecipe.add(presentationRecipe1, presentationRecipe1.getIngredient(), presentationRecipe1.getTags()));

        verify(recipeInterface).addRecipe(presentationRecipe1);
        verify(ingredient2RecipeInterface).addElement(ingredient1);
        verify(ingredient2RecipeInterface).addElement(ingredient2);
        verify(tag2RecipeInterface).addElement(generalElement1);
        verify(tag2RecipeInterface).addElement(generalElement2);
        System.out.println("End of testing add recipe exception.");
    }

    @Test(expected = UIDException.class)
    public void testAddRecipeUidException2() {
        System.out.println("Start of testing add recipe exception.");
        when(recipeInterface.addRecipe(presentationRecipe1)).thenReturn(1);
        when(ingredient2RecipeInterface.addElement(ingredient1)).thenThrow(UIDException.class);
        when(ingredient2RecipeInterface.addElement(ingredient2)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement1)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement2)).thenReturn(true);

        assertTrue(automaticAddRecipe.add(presentationRecipe1, presentationRecipe1.getIngredient(), presentationRecipe1.getTags()));

        verify(recipeInterface).addRecipe(presentationRecipe1);
        verify(ingredient2RecipeInterface).addElement(ingredient1);
        verify(ingredient2RecipeInterface).addElement(ingredient2);
        verify(tag2RecipeInterface).addElement(generalElement1);
        verify(tag2RecipeInterface).addElement(generalElement2);
        System.out.println("End of testing add recipe exception.");
    }

    @Test(expected = AmountException.class)
    public void testAddRecipeAmountException() {
        System.out.println("Start of testing add recipe exception.");
        when(recipeInterface.addRecipe(presentationRecipe1)).thenReturn(1);
        when(ingredient2RecipeInterface.addElement(ingredient1)).thenThrow(AmountException.class);
        when(ingredient2RecipeInterface.addElement(ingredient2)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement1)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement2)).thenReturn(true);

        assertTrue(automaticAddRecipe.add(presentationRecipe1, presentationRecipe1.getIngredient(), presentationRecipe1.getTags()));

        verify(recipeInterface).addRecipe(presentationRecipe1);
        verify(ingredient2RecipeInterface).addElement(ingredient1);
        verify(ingredient2RecipeInterface).addElement(ingredient2);
        verify(tag2RecipeInterface).addElement(generalElement1);
        verify(tag2RecipeInterface).addElement(generalElement2);
        System.out.println("End of testing add recipe exception.");
    }

    @Test
    public void testAddFail() {
        System.out.println("Start of test add function.");
        when(recipeInterface.addRecipe(presentationRecipe1)).thenReturn(1);
        when(ingredient2RecipeInterface.addElement(ingredient1)).thenReturn(true);
        when(ingredient2RecipeInterface.addElement(ingredient2)).thenReturn(false);
        when(tag2RecipeInterface.addElement(generalElement1)).thenReturn(true);
        when(tag2RecipeInterface.addElement(generalElement2)).thenReturn(true);
        when(recipeInterface.deleteRecipe(presentationRecipe1)).thenReturn(true);

        assertFalse(automaticAddRecipe.add(presentationRecipe1, presentationRecipe1.getIngredient(), presentationRecipe1.getTags()));

        verify(recipeInterface).addRecipe(presentationRecipe1);
        verify(ingredient2RecipeInterface).addElement(ingredient1);
        verify(ingredient2RecipeInterface).addElement(ingredient2);
        verify(tag2RecipeInterface, times(0)).addElement(generalElement1);
        verify(tag2RecipeInterface, times(0)).addElement(generalElement2);
        System.out.println("End of test add function.");
    }


}
