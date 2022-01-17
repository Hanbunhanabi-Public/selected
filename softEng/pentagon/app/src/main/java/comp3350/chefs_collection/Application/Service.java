// This is the Service class, which is used for calling the functions
// either in the stub database, which is used for iteration 1 and also it could be
// entended for the use of iteration 2 and 3 by choosing the boolean value, if the database is
// stub or not

package comp3350.chefs_collection.Application;

import comp3350.chefs_collection.Logic.AccessExternalPersistence;
import comp3350.chefs_collection.Logic.AccessIngredient2Recipe;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Logic.AccessSubList;
import comp3350.chefs_collection.Logic.AccessSubList2Recipe;
import comp3350.chefs_collection.Logic.AccessTag2Recipe;
import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalPersistence;
import comp3350.chefs_collection.Persistence.ExternalInterface;
import comp3350.chefs_collection.Persistence.Ingredient2RecipeInterface;
import comp3350.chefs_collection.Persistence.RecipeInterface;
import comp3350.chefs_collection.Persistence.SubList2RecipeInterface;
import comp3350.chefs_collection.Persistence.SubListInterface;
import comp3350.chefs_collection.Persistence.Tag2RecipeInterface;
import comp3350.chefs_collection.Persistence.hsqldb.Ingredient2RecipeHSQLDB;
import comp3350.chefs_collection.Persistence.hsqldb.RecipeHSQLDB;
import comp3350.chefs_collection.Persistence.hsqldb.SubList2RecipeHSQLDB;
import comp3350.chefs_collection.Persistence.hsqldb.SubListHSQLDB;
import comp3350.chefs_collection.Persistence.hsqldb.Tag2RecipeHSQLDB;

public class Service {


    private static RecipeInterface recipePersistence = null;
    private static SubListInterface sublistPersistence = null;
    private static Ingredient2RecipeInterface I2RPersistence = null;
    private static Tag2RecipeInterface T2RPersistence = null;
    private static SubList2RecipeInterface S2RPersistence = null;
    private static ExternalInterface externalInterface = null;


    private static ExternalInterface getExternalInterface() {
        if (externalInterface == null)
            externalInterface = new ExternalPersistence(Main.getRootPath());
        return externalInterface;
    }

    public static AccessExternalPersistence getAccessExternal() {
        return new AccessExternalPersistence(getExternalInterface());
    }


    //---
    private static RecipeInterface getRecipeInterface() {
        if (recipePersistence == null)
            recipePersistence = new RecipeHSQLDB(Main.getDBPathName());
        return recipePersistence;
    }

    public static AccessRecipe getAccessRecipe() {
        return new AccessRecipe(getRecipeInterface());
    }


    //---
    private static SubListInterface getSublistInterface() {
        if (sublistPersistence == null)
            sublistPersistence = new SubListHSQLDB(Main.getDBPathName());
        return sublistPersistence;
    }

    public static AccessSubList getAccessSubList() {
        return new AccessSubList(getSublistInterface());
    }


    //---
    private static Tag2RecipeInterface getT2RInterface() {
        if (T2RPersistence == null)
            T2RPersistence = new Tag2RecipeHSQLDB(Main.getDBPathName());
        return T2RPersistence;
    }

    public static AccessTag2Recipe getAccessT2R() {
        return new AccessTag2Recipe(getT2RInterface());
    }


    //---
    private static SubList2RecipeInterface getS2RInterface() {
        if (S2RPersistence == null)
            S2RPersistence = new SubList2RecipeHSQLDB(Main.getDBPathName());
        return S2RPersistence;
    }

    public static AccessSubList2Recipe getAccessS2R() {
        return new AccessSubList2Recipe(getS2RInterface());
    }


    //---
    private static Ingredient2RecipeInterface getI2RInterface() {
        if (I2RPersistence == null)
            I2RPersistence = new Ingredient2RecipeHSQLDB(Main.getDBPathName());
        return I2RPersistence;
    }

    public static AccessIngredient2Recipe getAccessI2R() {
        return new AccessIngredient2Recipe(getI2RInterface());
    }

}
