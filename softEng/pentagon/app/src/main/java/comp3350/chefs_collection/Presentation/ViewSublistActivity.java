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
import comp3350.chefs_collection.Logic.AccessSubList2Recipe;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Objects.SubListToRecipe;
import comp3350.chefs_collection.Presentation.ListAdapters.S2RAdapter;
import comp3350.chefs_collection.R;

public class ViewSublistActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_sublist);

        //Set up adapter
        S2RAdapter adapter = new S2RAdapter(this, R.layout.activity_view_sublist);
        setContentView(R.layout.view_sublist);

        ListView lv = findViewById(R.id.sublistView);
        lv.setAdapter(adapter);

        //Get uid from intent
        Intent intent = getIntent();
        int uID = intent.getIntExtra("sId", 0);

        //Populate recipe list
        AccessSubList2Recipe accessSubList2Recipe = Service.getAccessS2R();
        AccessRecipe accessRecipe = Service.getAccessRecipe();
        List<SubListToRecipe> sublist = accessSubList2Recipe.fetchAllElementBySUID(uID);
        ArrayList<Recipe> recipeList = new ArrayList<Recipe>();
        for (SubListToRecipe curr : sublist) {
            recipeList.add(accessRecipe.getRecipe(curr.getRUID()));
        }

        //Fill adapter
        adapter.addAll(sublist);
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                int recipeId = recipeList.get(position).getUID();
                Intent intent = new Intent(ViewSublistActivity.this, ViewRecipeActivity.class);
                intent.putExtra("rId", recipeId);
                recreate();
                startActivity(intent);
            }
        });

    }

}
