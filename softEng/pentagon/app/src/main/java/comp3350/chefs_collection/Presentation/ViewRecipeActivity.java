package comp3350.chefs_collection.Presentation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.GridView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessIngredient2Recipe;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Presentation.PresentationObjects.PresentationRecipe;
import comp3350.chefs_collection.R;

public class ViewRecipeActivity extends AppCompatActivity {
    private static final AssemblePresentRecipe assemblePresentRecipe = new AssemblePresentRecipe();
    private AccessRecipe accessRecipe;
    private ArrayList<String> tagList;
    private int uID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_recipe);

        //Access dbd
        accessRecipe = Service.getAccessRecipe();

        //Get uid from intent
        Intent intent = getIntent();
        uID = intent.getIntExtra("rId", 0);

        //retrieve recipe
        PresentationRecipe recipe = assemblePresentRecipe.assemble(uID);

        //Update History

        accessRecipe.updateHistory(accessRecipe.getRecipe(uID));


        //Do tagList stuff
        String tagStr = recipe.tagToString();
        //Tokenize string of tagList
        tagList = new ArrayList<>(Arrays.asList(tagStr.split("\n")));


        if (tagList.size() > 0) {
            GridView tagGrid = findViewById(R.id.tagGrid);
            ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, tagList);
            tagGrid.setAdapter(adapter);

            tagGrid.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                @Override
                public void onItemClick(AdapterView<?> parent, View view,
                                        int position, long id) {

                    Intent tagIntent = new Intent(ViewRecipeActivity.this, BrowseTag.class);
                    tagIntent.putExtra("tagName", tagList.get(position));
                    //Close this recipe
                    startActivity(tagIntent);
                    finish();
                }

            });
        }

        TextView title = findViewById(R.id.recipeViewTitle);
        TextView abst = findViewById(R.id.Abstract);
        TextView cont = findViewById(R.id.Content);
        TextView comment = findViewById(R.id.commentView);


        title.setText(recipe.getName());
        abst.setText(recipe.getContent());

        initIngredients(recipe);
        cont.setText(recipe.getContent());
        comment.setText(recipe.getComment());
        updateRating();

    }

    //update recipe button colors
    private void updateRating() {
        Recipe temp = accessRecipe.getRecipe(uID);
        int rating = temp.getRating();
        String stars = "";

        clearStars();

        switch (rating) {
            case 0: {
                stars += "NOT YET RATED";
            }
            break;
            case 1: {
                stars += "" + rating + " / 5 stars";
                Button star = findViewById(R.id.star1);
                star.setBackgroundColor(getColor(R.color.colorSecondary));
            }
            break;//1
            case 2: {
                stars += "" + rating + " / 5 stars";
                Button star = findViewById(R.id.star2);
                star.setBackgroundColor(getColor(R.color.colorSecondary));
            }
            break;//2
            case 3: {
                stars += "" + rating + " / 5 stars";
                Button star = findViewById(R.id.star3);
                star.setBackgroundColor(getColor(R.color.colorSecondary));
            }
            break;//3
            case 4: {
                stars += "" + rating + " / 5 stars";
                Button star = findViewById(R.id.star4);
                star.setBackgroundColor(getColor(R.color.colorSecondary));
            }
            break;//4
            case 5: {
                stars += "" + rating + " / 5 stars";
                Button star = findViewById(R.id.star5);
                star.setBackgroundColor(getColor(R.color.colorSecondary));
            }
            break;
            default: {
                stars += "NOT YET RATED";
            }
        }//end of switch

        TextView text = findViewById(R.id.rating);
        text.setText(stars);
    }

    private void initIngredients(Recipe recipe) {
        int pos = 0;
        AccessIngredient2Recipe i2R = Service.getAccessI2R();
        List<Ingredient> ings = i2R.fetchElementSequences(recipe.getUID());

        Ingredient current;

        StringBuilder ingredientList = new StringBuilder();

        while (!ings.isEmpty() && ings.size() > pos) {

            current = ings.get(pos);
            ingredientList.append(" ").append(current.getAmount()).append(" ").append(current.getName()).append("    ");
            pos++;

        }

        TextView ingredients = findViewById(R.id.Ingredients);
        ingredients.setText(ingredientList.toString());
    }

    public void add2Sub(View view) {
        Intent intent = new Intent(ViewRecipeActivity.this, Add2Sub.class);
        intent.putExtra("rId", uID);

        startActivity(intent);
    }

    //defaults all stars to unset
    private void clearStars() {
        Button star = findViewById(R.id.star1);
        star.setBackgroundColor(getColor(R.color.colorPrimaryDark));
        star = findViewById(R.id.star2);
        star.setBackgroundColor(getColor(R.color.colorPrimaryDark));
        star = findViewById(R.id.star3);
        star.setBackgroundColor(getColor(R.color.colorPrimaryDark));
        star = findViewById(R.id.star4);
        star.setBackgroundColor(getColor(R.color.colorPrimaryDark));
        star = findViewById(R.id.star5);
        star.setBackgroundColor(getColor(R.color.colorPrimaryDark));
    }

    public void exportRecipe(View view) {

//        String newFile = ""+uID;
        Intent newIntent = new Intent(ViewRecipeActivity.this, FileSaveActivity.class);
        newIntent.putExtra("newFileName", "/");
        newIntent.putExtra("uId", uID);
        startActivity(newIntent);
    }

    public void star1(View view) {
        Recipe temp = accessRecipe.getRecipe(uID);
        temp.setRating(1);
        accessRecipe.updateRecipe(temp);
        updateRating();
    }

    public void star2(View view) {
        Recipe temp = accessRecipe.getRecipe(uID);
        temp.setRating(2);
        accessRecipe.updateRecipe(temp);
        updateRating();

    }

    public void star3(View view) {
        Recipe temp = accessRecipe.getRecipe(uID);
        temp.setRating(3);
        accessRecipe.updateRecipe(temp);
        updateRating();

    }

    public void star4(View view) {
        Recipe temp = accessRecipe.getRecipe(uID);
        temp.setRating(4);
        accessRecipe.updateRecipe(temp);
        updateRating();

    }

    public void star5(View view) {
        Recipe temp = accessRecipe.getRecipe(uID);
        temp.setRating(5);
        accessRecipe.updateRecipe(temp);
        updateRating();

    }

    public void deleteRecipe(View view){
        Recipe temp = accessRecipe.getRecipe(uID);
        if (accessRecipe.deleteRecipe(temp)) {
            Toast.makeText(this, "Recipe successfully deleted", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Recipe not deleted", Toast.LENGTH_SHORT).show();
        }

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }

}
