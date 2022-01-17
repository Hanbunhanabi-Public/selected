package comp3350.chefs_collection.Presentation;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Presentation.ListAdapters.HistoryListAdapter;
import comp3350.chefs_collection.R;

public class BrowseHistory extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Set up adapter
        HistoryListAdapter adapter = new HistoryListAdapter(this, R.layout.history_list_item);
        setContentView(R.layout.view_list);
        ListView lv = findViewById(R.id.recipeListView);
        lv.setAdapter(adapter);

        //Populate History List
        AccessRecipe accessRecipe = Service.getAccessRecipe();
        List<Integer> list = accessRecipe.fetchAllHistory();

        ArrayList<Recipe> histories = new ArrayList<Recipe>(accessRecipe.fetchRecipes(list));

        //Fill adapter
        adapter.addAll(histories);


    }
}
