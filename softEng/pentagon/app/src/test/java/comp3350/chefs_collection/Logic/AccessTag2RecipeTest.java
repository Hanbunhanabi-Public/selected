package comp3350.chefs_collection.Logic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Persistence.Tag2RecipeInterface;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertNotNull;
import static junit.framework.Assert.assertNotSame;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AccessTag2RecipeTest {
    private AccessTag2Recipe accessTags;
    private Tag2RecipeInterface t2Rinterface;
    private GeneralElement element3;
    private GeneralElement element4;
    private GeneralElement element6;
    private GeneralElement element7;
    private List<GeneralElement> list2;
    private List<GeneralElement> list3;
    private List<GeneralElement> list4;



    @Before
    public void setup() {
        this.t2Rinterface = mock(Tag2RecipeInterface.class);
        this.accessTags = new AccessTag2Recipe(t2Rinterface);
        List<GeneralElement> list1 = new ArrayList<>();
        this.list2 = new ArrayList<>();
        this.list3 = new ArrayList<>();
        this.list4 = new ArrayList<>();

        GeneralElement element1 = new GeneralElement(1, "Spicy");
        GeneralElement element2 = new GeneralElement(1, "Oily");
        this.element3 = new GeneralElement(2, "Crispy");
        this.element4 = new GeneralElement(2, "Spicy");
        GeneralElement element5 = new GeneralElement(3, "Cold dish");
        this.element6 = new GeneralElement(1, "Spicy");
        this.element7 = new GeneralElement(3, "Spicy");
        list1.add(element1);
        list1.add(element2);
        list1.add(element3);
        list1.add(element4);
        list1.add(element5);
        this.list2.add(element1);
        this.list2.add(element4);
        this.list4.add(element1);
        this.list4.add(element2);
    }

    @After
    public void cleanUp() {
        accessTags = null;
    }

    @Test
    public void testNotNull() {
        System.out.println("Start testing null access");
        assertNotNull(accessTags);
        System.out.println("End testing null access");
    }

    @Test
    public void testFetchAllElementByName() {
        System.out.println("Start of testing fetch all element by name function for Tag.");
        when(t2Rinterface.fetchAllElement("Spicy")).thenReturn(list2);
        when(t2Rinterface.fetchAllElement("Oily")).thenReturn(list3);
        assertEquals(accessTags.fetchElementSequences("Spicy"), list2);
        assertNotSame(accessTags.fetchElementSequences("Oily"), list2);
        verify(t2Rinterface).fetchAllElement("Spicy");
        verify(t2Rinterface).fetchAllElement("Oily");

        System.out.println("End of testing fetch all element by name function for Tag.");
    }

    @Test
    public void testFetchAllElementByID() {
        System.out.println("Start testing fetch all elements by ID for TAG.");
        List<GeneralElement> newList = new ArrayList<>();
        newList.add(element3);
        newList.add(element4);
        when(t2Rinterface.fetchAllElement(1)).thenReturn(list4);
        when(t2Rinterface.fetchAllElement(2)).thenReturn(newList);
        assertEquals(accessTags.fetchElementSequences(1), list4);
        assertEquals(accessTags.fetchElementSequences(2), newList);
        verify(t2Rinterface).fetchAllElement(1);
        verify(t2Rinterface).fetchAllElement(2);
        System.out.println("End testing fetch all elements by ID for TAG.");
    }

    @Test
    public void testAddElement() {
        System.out.println("Start of test add element function for tag.");
        when(t2Rinterface.addElement(element6)).thenReturn(false);
        when(t2Rinterface.addElement(element7)).thenReturn(true);
        assertFalse(accessTags.addElement(element6));
        assertTrue(accessTags.addElement(element7));
        verify(t2Rinterface).addElement(element6);
        verify(t2Rinterface).addElement(element7);
        System.out.println("End of test add element function for tag.");
    }
}
