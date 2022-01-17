


package comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;

import comp3350.chefs_collection.Persistence.ExternalInterface;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;

public class ExternalPersistence implements ExternalInterface {
    private static final Gson gson = new Gson();
    private final String rootPath;


    public ExternalPersistence(final String rootPath) {
        this.rootPath = rootPath;
    }


    /**
     * import external recipes
     *
     * @param fileName a target file load
     * @return a array of presentation recipe
     */
    public PresentationRecipe loadRecipe(File fileName) throws ExternalFileExpection {
        PresentationRecipe result = null;
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(fileName));
            result = gson.fromJson(reader, PresentationRecipe.class);
            reader.close();
            return result;
        } catch (IOException e) {
            throw new ExternalFileExpection(e.getMessage());
        } catch (JsonParseException e) {
            throw new ExternalFileExpection(e.getMessage());
        }

    }

    /**
     * dump selected recipe list into a file
     *
     * @param fileName a target file to save recipe
     * @param list     a list of presentationRecipes for export
     * @return on success return true
     */
    public void saveRecipeList(File fileName, PresentationRecipe list) throws ExternalFileExpection {
        try {
            Writer writer = new FileWriter(fileName);
            Gson gson = new GsonBuilder().create();
            gson.toJson(list, writer);
            writer.close();


        } catch (IOException e) {
            throw new ExternalFileExpection(e.getMessage());
        }

    }


    private File[] getFileList(File path) {
        File currentPath = path;
        if (path.getParent() == null)
            currentPath = new File(rootPath, currentPath.getName());

        return currentPath.listFiles();
    }

    public ArrayList<File> getRecipeList(File path) {
        File[] currentList = getFileList(path);
        ArrayList<File> recipes = new ArrayList<>();
        for (File i : currentList) {
            if (i.exists() && i.isFile()) {
                String[] temp = i.getName().split("\\.");
                if (temp[1].equals("recipe"))
                    recipes.add(i);
            }
        }
        return recipes;
    }

    public ArrayList<File> getDirectoryList(File path) {
        File[] currentList = getFileList(path);
        ArrayList<File> directory = new ArrayList<>();
        for (File i : currentList) {
            if (i.exists() && i.isDirectory()) {
                directory.add(i);
            }
        }
        return directory;
    }


}
