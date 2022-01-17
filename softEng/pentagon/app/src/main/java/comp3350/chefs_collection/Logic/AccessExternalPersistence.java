package comp3350.chefs_collection.Logic;

import java.io.File;
import java.util.ArrayList;

import comp3350.chefs_collection.Logic.Validator.ValidExternalAccess;
import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalFileExpection;
import comp3350.chefs_collection.Persistence.ExternalInterface;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

public class AccessExternalPersistence {
    private final ValidExternalAccess validExternalAccess;
    private final ExternalInterface externalInterface;


    public AccessExternalPersistence(ExternalInterface externalInterface) {
        this.externalInterface = externalInterface;
        this.validExternalAccess = new ValidExternalAccess();
    }


    /**
     * import external recipes
     *
     * @param fileName a target file load
     * @return a array of presentation recipe
     */
    public PresentationRecipe loadRecipe(File fileName) throws ExternalFileExpection {
        PresentationRecipe result = null;
        result = externalInterface.loadRecipe(fileName);
        validExternalAccess.validate(result);
        return result;
    }

    /**
     * dump selected recipe list into a file
     * @param fileName a target file to save recipe
     * @param list a list of presentationRecipes for export
     * @return on success return true
     */
    public void saveRecipeList(File fileName, PresentationRecipe list) throws ExternalFileExpection {
        externalInterface.saveRecipeList(fileName, list);
    }

    /**
     * file existence check
     * @param path target file path
     * @return true if that file exist
     */
    public ArrayList<File> getRecipeList(File path) {
        return externalInterface.getRecipeList(path);
    }


    public ArrayList<File> getDirectoryList(File path) {
        return externalInterface.getDirectoryList(path);
    }


}
