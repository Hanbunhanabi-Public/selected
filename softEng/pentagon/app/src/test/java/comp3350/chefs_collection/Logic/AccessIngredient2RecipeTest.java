package comp3350.chefs_collection.Logic;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Logic.Exceptions.AmountException;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Persistence.Ingredient2RecipeInterface;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertNotNull;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class AccessIngredient2RecipeTest {
    private AccessIngredient2Recipe accessIngredient;
    private Ingredient2RecipeInterface i2RInterface;

    private Ingredient ingredient1;
    private Ingredient ingredient6;
    private Ingredient ingredient10;
    private Ingredient ingredient11;
    private Ingredient ingredient12;
    private Ingredient ingredient13;

    private ArrayList<Ingredient> storageTest2;


    @Before
    public void setup() {

        this.i2RInterface = mock(Ingredient2RecipeInterface.class);
        this.accessIngredient = new AccessIngredient2Recipe(i2RInterface);

        ArrayList<Ingredient> storageTest1 = new ArrayList<>();
        this.storageTest2 = new ArrayList<>();

        this.ingredient1 = new Ingredient(1, "Beef", "500 g");



        this.ingredient6 = new Ingredient(1, "test1_ingredient", "test1_amount");
        Ingredient ingredient7 = new Ingredient(2, "test2_ingredient", "test2_amount");
        Ingredient ingredient8 = new Ingredient(3, "test3_ingredient", "test3_amount");
        Ingredient ingredient9 = new Ingredient(4, "test3_ingredient", "test4_amount");
        this.ingredient10 = new Ingredient(1, "test1_ingredient", "test1_amount_2");
        this.ingredient12 = new Ingredient(0, "test1_ingredient", "test1_amount_2");
        this.ingredient13 = new Ingredient(1, "test1_ingredient", "");
        this.ingredient11 = new Ingredient(1, "", "test1_amount_2");

        storageTest1.add(ingredient6);
        storageTest1.add(ingredient7);
        storageTest1.add(ingredient8);
        storageTest1.add(ingredient9);
        storageTest1.add(ingredient10);

        this.storageTest2.add(ingredient6);
        this.storageTest2.add(ingredient7);
        this.storageTest2.add(ingredient8);
        this.storageTest2.add(ingredient9);
    }

    @Test
    public void testNullAccessIngredient() {
        System.out.println("Start testing null");
        assertNotNull(accessIngredient);
        System.out.println("End testing null");
    }

    @Test
    public void testAddElement() {

        System.out.println("Start of test add element method");

        when(i2RInterface.addElement(ingredient10)).thenReturn(false);
        when(i2RInterface.addElement(ingredient1)).thenReturn(true);
        assertFalse(accessIngredient.addElement(ingredient10));
        accessIngredient.addElement(ingredient1);
        storageTest2.add(ingredient1);
        verify(i2RInterface).addElement(ingredient10);
        verify(i2RInterface).addElement(ingredient1);
        System.out.println("End of test add element method");


    }

    @Test(expected = NameException.class)
    public void testAddNoNameIngredient() {
        System.out.println("Start testing add no name ingredient.");
        when(i2RInterface.addElement(ingredient11)).thenReturn(true);
        assertTrue(accessIngredient.addElement(ingredient11));
        verify(i2RInterface).addElement(ingredient11);
        System.out.println("End testing add no name ingredient.");
    }

    @Test(expected = UIDException.class)
    public void testAddInvalidNumRecipe() {
        System.out.println("Start of testing invalid recipe with UID < 1.");
        when(i2RInterface.addElement(ingredient12)).thenReturn(true);
        assertTrue(accessIngredient.addElement(ingredient12));
        verify(i2RInterface).addElement(ingredient12);
        System.out.println("End of testing invalid recipe with UID < 1.");
    }

    @Test(expected = AmountException.class)
    public void testAddInvalidAmount() {
        System.out.println("Start of Test add recipe with invalid amount.");
        when(i2RInterface.addElement(ingredient13)).thenReturn(true);
        assertTrue(accessIngredient.addElement(ingredient13));
        verify(i2RInterface).addElement(ingredient13);
        System.out.println("End of Test add recipe with invalid amount.");
    }

    @Test
    public void testFetchElementSequencesByID() {
        System.out.println("Start of test fetch by name test");
        List<Ingredient> newList = new ArrayList<>();
        newList.add(ingredient6);
        newList.add(ingredient10);
        List<Ingredient> newerList = new ArrayList<>();
        when(i2RInterface.fetchElementSequences(1)).thenReturn(newList);

        assertEquals(accessIngredient.fetchElementSequences(1), newList);
        assertEquals(accessIngredient.fetchElementSequences(2), newerList);
        verify(i2RInterface).fetchElementSequences(1);

        System.out.println("End of test fetch by name test");
    }


}
