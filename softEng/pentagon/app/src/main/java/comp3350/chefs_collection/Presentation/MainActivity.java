package comp3350.chefs_collection.Presentation;

import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

import comp3350.chefs_collection.Application.Main;
import comp3350.chefs_collection.R;

public class MainActivity extends AppCompatActivity {
    private static boolean ranOnce = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (!ranOnce) {
            copyDatabaseToDevice();
            ranOnce = true;
        }
    }

    //Various button press functions
    public void browse(View view){
        Intent intent = new Intent(this, BrowseAll.class);
        startActivity(intent);
    }


    public void history(View view){
        Intent intent = new Intent(this, BrowseHistory.class);
        startActivity(intent);

    }

    public void addRecipe(View view){
        Intent intent = new Intent(this, AddRecipe.class);
        startActivity(intent);
    }

    public void importRecipe (View view){
        Intent intent = new Intent(this, FileExploreActivity.class);
        intent.putExtra("newFileName", "/");
        startActivity(intent);
    }

    public void sublists(View view){
       Intent intent = new Intent(this, BrowseSublistActivity.class);
       startActivity(intent);
    }

    public void addSublist(View view){
        Intent intent = new Intent(this, AddSublist.class);
        startActivity(intent);
    }

    public void search(View view){
        Intent intent = new Intent(this, SearchByName.class);
        startActivity(intent);
    }


    private void copyDatabaseToDevice() {
        final String DB_PATH = "db";

        String[] assetNames;
        Context context = getApplicationContext();
        File dataDirectory = context.getDir(DB_PATH, Context.MODE_PRIVATE);
        AssetManager assetManager = getAssets();

        try {
            assetNames = assetManager.list(DB_PATH);

            for (int i = 0; i < assetNames.length; i++) {
                assetNames[i] = DB_PATH + "/" + assetNames[i];
            }

            copyAssetsToDirectory(assetNames, dataDirectory);
            Main.setDBPathName(dataDirectory.toString() + "/" + Main.getDBPathName());
        } catch (final IOException ioe) {
            System.out.println("initial error");
        }
    }

    private void copyAssetsToDirectory(String[] assets,
                                       File directory) throws IOException {
        AssetManager assetManager = getAssets();

        for (String asset : assets) {
            String[] components = asset.split("/");
            String copyPath = directory.toString() + "/" + components[components.length - 1];

            char[] buffer = new char[1024];
            int count;

            File outFile = new File(copyPath);

            if (!outFile.exists()) {
                InputStreamReader in = new InputStreamReader(assetManager.open(asset));
                FileWriter out = new FileWriter(outFile);

                count = in.read(buffer);

                while (count != -1) {
                    out.write(buffer, 0, count);
                    count = in.read(buffer);
                }

                out.close();
                in.close();
            }
        }
    }

}
