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
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Presentation.ListAdapters.RecipeListAdapter;
import comp3350.chefs_collection.R;

public class SearchResults extends AppCompatActivity {

    private ArrayList<Recipe> recipes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Set up adapter
        RecipeListAdapter adapter = new RecipeListAdapter(this, R.layout.recipe_list_item);
        setContentView(R.layout.view_list);

        Intent intent = getIntent();
        String string = intent.getStringExtra("string");

        ListView lv = findViewById(R.id.recipeListView);
        lv.setAdapter(adapter);

        //Populate recipe list
        recipes = new ArrayList<Recipe>(getList(string));


        //Fill adapter
        adapter.addAll(recipes);
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                int recipeId = recipes.get(position).getUID();
                Intent intent = new Intent(SearchResults.this, ViewRecipeActivity.class);
                intent.putExtra("rId", recipeId);
                startActivity(intent);
                finish();
            }
        });
    }

    private List<Recipe> getList(String string) {

        string = string.toLowerCase();

        AccessRecipe access = Service.getAccessRecipe();
        ArrayList<Recipe> result = new ArrayList<>();
        ArrayList<Recipe> all = new ArrayList<>(access.fetchAllRecipe());
        if (!string.equals("")) {
            int pos = 0;
            //Loop through all recipes, extracting any recipe whose name contains string
            while (pos < all.size()) {
                Recipe recipe = all.get(pos);
                String name = recipe.getName();
                name = name.toLowerCase();

                if (name.contains(string)) {
                    result.add(recipe);
                }
                pos++;
            }
        }

        return result;
    }
}
