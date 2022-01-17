package comp3350.chefs_collection.Logic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.SubListInterface;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertNotNull;
import static junit.framework.Assert.assertNotSame;
import static junit.framework.Assert.assertNull;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AccessSubListTest {
    private AccessSubList accessSubList;
    private SubListInterface sublistInterface;
    private GeneralElement element1;
    private GeneralElement element3;
    private GeneralElement element5;
    private List<GeneralElement> compareList;


    @Before
    public void setup() {
        this.sublistInterface = mock(SubListInterface.class);
        this.accessSubList = new AccessSubList(sublistInterface);
        this.compareList = new ArrayList<>();

        this.element1 = new GeneralElement(1, "Favourite");
        GeneralElement element2 = new GeneralElement(2, "Meats");
        this.element3 = new GeneralElement(3, "Secret");
        this.element5 = new GeneralElement(4, "Meats");

        this.compareList.add(element1);
        this.compareList.add(element2);
        this.compareList.add(element3);
    }

    @After
    public void cleanUp() {
        accessSubList = null;
    }

    @Test
    public void testNotNull() {
        System.out.println("Start testing null access");
        assertNotNull(accessSubList);
        System.out.println("End testing null access");
    }

    @Test
    public void testGetElement() {
        System.out.println("Start testing get element method for sublist.");
        when(sublistInterface.getElement(1)).thenReturn(element1);
        assertEquals(sublistInterface.getElement(1), element1);
        assertNotSame(sublistInterface.getElement(2), element1);
        verify(sublistInterface).getElement(1);
        verify(sublistInterface).getElement(2);

        System.out.println("End testing get element method for sublist.");
    }

    @Test
    public void testDeleteElement() {
        System.out.println("Start testing delete element method for sublist.");
        when(sublistInterface.deleteElement(element3)).thenReturn(true);
        when(sublistInterface.deleteElement(element5)).thenReturn(false);
        assertTrue(accessSubList.deleteElement(element3));
        assertFalse(accessSubList.deleteElement(element5));
        verify(sublistInterface).deleteElement(element3);
        verify(sublistInterface).deleteElement(element5);

        accessSubList = new AccessSubList(sublistInterface);
        assertTrue(accessSubList.deleteElement(element3));
        assertFalse(accessSubList.deleteElement(element5));
        assertNull(accessSubList.getElement(3));
        System.out.println("End testing delete element method for sublist.");
    }

    @Test
    public void testFetchAll() {
        System.out.println("Start of testing fetch all element for sublist");
        when(sublistInterface.fetchAllElement()).thenReturn(compareList);
        assertEquals(accessSubList.fetchAllElement(), compareList);
        verify(sublistInterface).fetchAllElement();
        System.out.println("End of testing fetch all element for sublist");
    }

    @Test
    public void testAddElement() {
        System.out.println("Start of test add element function for sublist");
        when(sublistInterface.addElement(element5)).thenReturn(true);
        when(sublistInterface.addElement(element1)).thenReturn(false);

        assertFalse(accessSubList.addElement(element1));
        assertTrue(accessSubList.addElement(element5));

        verify(sublistInterface).addElement(element1);
        verify(sublistInterface).addElement(element5);
        System.out.println("End of test add element function for sublist");
    }

}
