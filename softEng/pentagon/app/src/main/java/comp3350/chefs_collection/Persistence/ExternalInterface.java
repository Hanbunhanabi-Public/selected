package comp3350.chefs_collection.Persistence;

import java.io.File;
import java.util.ArrayList;

import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalFileExpection;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

public interface ExternalInterface {

    /**
     * import external recipes
     *
     * @param fileName a target file load
     * @return a array of presentation recipe
     */
    PresentationRecipe loadRecipe(File fileName) throws ExternalFileExpection;

    /**
     * dump selected recipe list into a file
     *
     * @param fileName a target file to save recipe
     * @param list     a list of presentationRecipes for export
     */
    void saveRecipeList(File fileName, PresentationRecipe list) throws ExternalFileExpection;


    ArrayList<File> getRecipeList(File path);


    ArrayList<File> getDirectoryList(File path);
}
