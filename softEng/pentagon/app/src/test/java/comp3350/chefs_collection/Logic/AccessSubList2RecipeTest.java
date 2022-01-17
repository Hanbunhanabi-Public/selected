package comp3350.chefs_collection.Logic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Objects.SubListToRecipe;
import comp3350.chefs_collection.Persistence.SubList2RecipeInterface;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertNotNull;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AccessSubList2RecipeTest {
    private AccessSubList2Recipe accessS2R;
    private SubList2RecipeInterface s2RInterface;
    private SubListToRecipe subListRecipe1;
    private SubListToRecipe subListRecipe6;
    private SubListToRecipe subListRecipe7;
    private List<SubListToRecipe> testList1;

    @Before
    public void setup() {
        this.s2RInterface = mock(SubList2RecipeInterface.class);
        this.accessS2R = new AccessSubList2Recipe(s2RInterface);

        this.testList1 = new ArrayList<>();
        List<SubListToRecipe> testList2 = new ArrayList<>();

        this.subListRecipe1 = new SubListToRecipe(1, 1);
        SubListToRecipe subListRecipe2 = new SubListToRecipe(1, 2);
        SubListToRecipe subListRecipe3 = new SubListToRecipe(1, 3);
        SubListToRecipe subListRecipe4 = new SubListToRecipe(2, 1);
        SubListToRecipe subListRecipe5 = new SubListToRecipe(2, 3);
        this.subListRecipe6 = new SubListToRecipe(2, 4);
        this.subListRecipe7 = new SubListToRecipe(2, 1);
        this.testList1.add(subListRecipe1);
        this.testList1.add(subListRecipe2);
        this.testList1.add(subListRecipe3);
        testList2.add(subListRecipe4);
        testList2.add(subListRecipe5);
    }

    @After
    public void cleanUp() {
        accessS2R = null;
    }

    @Test
    public void testNotNull() {
        System.out.println("Start testing null access");
        assertNotNull(accessS2R);
        System.out.println("End testing null access");
    }

    @Test
    public void testFetchAllElementBySUID() {
        System.out.println("Start of testing fetch all element by suid function.");
        when(s2RInterface.fetchAllElementBySUID(1)).thenReturn(testList1);
        assertEquals(accessS2R.fetchAllElementBySUID(1), testList1);
        verify(s2RInterface).fetchAllElementBySUID(1);
        System.out.println("End of testing fetch all element by suid function.");
    }


    @Test
    public void testAddElement() {
        System.out.println("Start of testing add element function for s2r");
        when(s2RInterface.addElement(subListRecipe1)).thenReturn(false);
        when(s2RInterface.addElement(subListRecipe7)).thenReturn(false);
        when(s2RInterface.addElement(subListRecipe6)).thenReturn(true);

        assertFalse(accessS2R.addElement(subListRecipe7));
        assertFalse(accessS2R.addElement(subListRecipe1));
        assertTrue(accessS2R.addElement(subListRecipe6));

        verify(s2RInterface).addElement(subListRecipe1);
        verify(s2RInterface).addElement(subListRecipe6);
        verify(s2RInterface).addElement(subListRecipe7);
        System.out.println("End of testing add element function for s2r");
    }

    @Test
    public void testDeleteFunction() {
        System.out.println("Start of test delete function for s2r.");
        when(s2RInterface.deleteElement(subListRecipe7)).thenReturn(true);
        when(s2RInterface.deleteElement(subListRecipe6)).thenReturn(false);

        assertFalse(accessS2R.deleteElement(subListRecipe6));

        assertTrue(accessS2R.deleteElement(subListRecipe7));

        verify(s2RInterface).deleteElement(subListRecipe7);
        verify(s2RInterface).deleteElement(subListRecipe6);
        System.out.println("End of test delete function for s2r.");
    }


}
