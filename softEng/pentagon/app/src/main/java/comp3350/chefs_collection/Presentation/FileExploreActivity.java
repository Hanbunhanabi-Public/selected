package comp3350.chefs_collection.Presentation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import java.io.File;
import java.util.ArrayList;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessExternalPersistence;
import comp3350.chefs_collection.Logic.AutomaticAddRecipe;
import comp3350.chefs_collection.Logic.Exceptions.AmountException;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalFileExpection;
import comp3350.chefs_collection.Presentation.ListAdapters.FileListAdapter;
import comp3350.chefs_collection.Presentation.ListAdapters.SetListviewItemHeigtUtil;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;
import comp3350.chefs_collection.R;

public class FileExploreActivity extends AppCompatActivity {

    private AccessExternalPersistence accessExternalPersistence;
    private AutomaticAddRecipe auto;

    private ArrayList<File> directoryFileList;
    private ArrayList<File> recipeFileList;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.accessExternalPersistence = Service.getAccessExternal();
        this.auto = new AutomaticAddRecipe(Service.getAccessRecipe(), Service.getAccessT2R(), Service.getAccessI2R());
        FileListAdapter directoryAdapter = new FileListAdapter(this, R.layout.activity_file_explore);
        FileListAdapter fileAdapter = new FileListAdapter(this, R.layout.activity_file_explore);

        setContentView(R.layout.file_explore_list);
        ListView lv_dict = findViewById(R.id.directories);
        ListView lv_files = findViewById(R.id.files);
        lv_dict.setAdapter(directoryAdapter);
        lv_files.setAdapter(fileAdapter);

        Intent intent = getIntent();
        File currentPath = new File(intent.getStringExtra("newFileName"));

        try {

            directoryFileList = accessExternalPersistence.getDirectoryList(currentPath);
            recipeFileList = accessExternalPersistence.getRecipeList(currentPath);


            if (recipeFileList != null)
                fileAdapter.addAll(recipeFileList);
            if (directoryFileList != null)
                directoryAdapter.addAll(directoryFileList);
            SetListviewItemHeigtUtil.setListViewHeightBasedOnChildren(lv_dict);

            SetListviewItemHeigtUtil.setListViewHeightBasedOnChildren(lv_files);

            lv_dict.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {


                    Intent intent = new Intent(FileExploreActivity.this, FileExploreActivity.class);
                    intent.putExtra("newFileName", directoryFileList.get(position).getAbsolutePath());
                    startActivity(intent);
                }
            });

            lv_files.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    File path = recipeFileList.get(position);
                    PresentationRecipe recipe = null;
                    try {
                        recipe = accessExternalPersistence.loadRecipe(path);
                    } catch (ExternalFileExpection e) {

                        Toast.makeText(FileExploreActivity.this, "Error: invalid file", Toast.LENGTH_SHORT).show();
                    }
                    if (recipe != null && recipe.getUID() != -1) {


                        try {
                            auto.add(recipe, recipe.getIngredient(), recipe.getTags());
                            Toast.makeText(FileExploreActivity.this, "Recipe add successful", Toast.LENGTH_SHORT).show();

                        } catch (UIDException e) {
                            Toast.makeText(FileExploreActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                        } catch (NameException e) {
                            Toast.makeText(FileExploreActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                        } catch (AmountException e) {
                            Toast.makeText(FileExploreActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    } else
                        Toast.makeText(FileExploreActivity.this, "Error: invalid file", Toast.LENGTH_SHORT).show();

                }
            });

        } catch (NullPointerException e) {

            Toast.makeText(FileExploreActivity.this, "Error: Require storage access permission", Toast.LENGTH_SHORT).show();
            finish();
        }
    }
}
