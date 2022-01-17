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
import comp3350.chefs_collection.Persistence.AndroidFileSystemAccessor.ExternalFileExpection;
import comp3350.chefs_collection.Presentation.ListAdapters.FileListAdapter;
import comp3350.chefs_collection.Presentation.ListAdapters.SetListviewItemHeigtUtil;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;
import comp3350.chefs_collection.R;

public class FileSaveActivity extends AppCompatActivity {

    private AccessExternalPersistence accessExternalPersistence;
    private File currentPath = new File("/");
    private ArrayList<File> directoryFileList;
    private int uid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.accessExternalPersistence = Service.getAccessExternal();
        FileListAdapter directoryAdapter = new FileListAdapter(this, R.layout.activity_file_explore);
        setContentView(R.layout.file_save_list);
        ListView lv_dict = findViewById(R.id.directories);
        lv_dict.setAdapter(directoryAdapter);
        Intent intent = getIntent();
        currentPath = new File(intent.getStringExtra("newFileName"));
        uid = intent.getIntExtra("uId", 0);

        try {
            directoryFileList = accessExternalPersistence.getDirectoryList(currentPath);
            if (directoryFileList != null)
                directoryAdapter.addAll(directoryFileList);
            SetListviewItemHeigtUtil.setListViewHeightBasedOnChildren(lv_dict);
            lv_dict.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {


                    Intent intent = new Intent(FileSaveActivity.this, FileSaveActivity.class);
                    intent.putExtra("newFileName", directoryFileList.get(position).getAbsolutePath());
                    intent.putExtra("uId", uid);
                    startActivity(intent);
                }
            });
        } catch (NullPointerException e) {
            Toast.makeText(FileSaveActivity.this, "Error: Require storage access permission", Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    public void saveRecipe(View view) {

        try {
            AssemblePresentRecipe assemblePresentRecipe = new AssemblePresentRecipe();
            PresentationRecipe recipe = assemblePresentRecipe.assemble(uid);
            recipe.setHistory(null);
            String fileName = recipe.getName() + "_" + recipe.getUID() + ".recipe";
            File newFileName = new File(currentPath, fileName);
            accessExternalPersistence.saveRecipeList(newFileName, recipe);
            Toast.makeText(FileSaveActivity.this, fileName + " saved successful", Toast.LENGTH_SHORT).show();
            recreate();
        } catch (ExternalFileExpection e) {
            Toast.makeText(FileSaveActivity.this, "Error: file saved failure", Toast.LENGTH_SHORT).show();
            finish();
        }


    }


}
