package comp3350.chefs_collection.Presentation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Logic.AccessTag2Recipe;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Presentation.ListAdapters.RecipeListAdapter;
import comp3350.chefs_collection.R;

public class BrowseTag extends AppCompatActivity {

    private final ArrayList<Recipe> recipes = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Set up adapter
        RecipeListAdapter adapter = new RecipeListAdapter(this, R.layout.recipe_list_item);
        setContentView(R.layout.view_list);

        ListView lv = findViewById(R.id.recipeListView);
        lv.setAdapter(adapter);


        String tagName = getIntent().getExtras().getString("tagName");


        //Populate recipe list
        AccessRecipe accessRecipe = Service.getAccessRecipe();
        AccessTag2Recipe accessTag = Service.getAccessT2R();

        List<GeneralElement> rUIDs = accessTag.fetchElementSequences(tagName);

        Recipe recipe;
        int rUID;

        for (int i = 0; i < rUIDs.size(); i++) {
            rUID = rUIDs.get(i).getUid();
            recipe = accessRecipe.getRecipe(rUID);
            recipes.add(recipe);
        }


        //Fill adapter
        adapter.addAll(recipes);
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                int recipeId = recipes.get(position).getUID();
                Intent intent = new Intent(BrowseTag.this, ViewRecipeActivity.class);
                intent.putExtra("rId", recipeId);
                recreate();
                startActivity(intent);
            }
        });

    }


}
