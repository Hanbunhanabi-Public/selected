package comp3350.chefs_collection.Presentation;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.sql.Timestamp;
import java.util.ArrayList;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AutomaticAddRecipe;
import comp3350.chefs_collection.Logic.Exceptions.AmountException;
import comp3350.chefs_collection.Logic.Exceptions.ContentEcxeption;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.Ingredient;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.R;

public class AddRecipe extends AppCompatActivity {

    private final ArrayList<Ingredient> ings = new ArrayList<Ingredient>();
    private final ArrayList<GeneralElement> tags = new ArrayList<>();
    private String ingredientList = "";
    private String tagList = "";
    private int ingPos = 0;
    private int tagPos = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_recipe);
    }

    public void submitRecipe(View view) {
        String name = "";
        String content = "";
        String comment = "";


        //ArrayList<String> tags = new ArrayList<String>;
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        final EditText editName = findViewById(R.id.editName);
        final EditText editContent = findViewById(R.id.editContent);
        final EditText editComment = findViewById(R.id.editComment);

        name = editName.getText().toString();
        content = editContent.getText().toString();
        comment = editComment.getText().toString();
        String errorMsg = "invalid recipe, add recipe fail";
        Recipe newRecipe = new Recipe(name, content, 0, comment, timestamp, true);
        try {
            AutomaticAddRecipe automaticAddRecipe = new AutomaticAddRecipe(Service.getAccessRecipe(), Service.getAccessT2R(), Service.getAccessI2R());
            if (automaticAddRecipe.add(newRecipe, ings, tags)) {
                Toast.makeText(this, name + " added to collection", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, errorMsg, Toast.LENGTH_SHORT).show();
            }
        } catch (NameException e) {
            Toast.makeText(this, errorMsg, Toast.LENGTH_SHORT).show();
        } catch (AmountException e) {
            Toast.makeText(this, errorMsg, Toast.LENGTH_SHORT).show();
        } catch (UIDException e) {
            Toast.makeText(this, errorMsg, Toast.LENGTH_SHORT).show();
        } catch (ContentEcxeption e) {
            Toast.makeText(this, errorMsg, Toast.LENGTH_SHORT).show();
        }

        finish();
    }

    //Called when Add Ingredients button is pressed. Updates displayed ingredients in the recipe
    public void updateIngredients(View view) {

        final EditText editAmount = findViewById(R.id.editAmount);
        final EditText editIngredient = findViewById(R.id.editIngredient);
        final TextView viewIngredients = findViewById(R.id.addedIngredients);

        String amount = editAmount.getText().toString();
        String ing = editIngredient.getText().toString();

        Ingredient ingredient = new Ingredient(-1, ing, amount);

        ings.add(ingredient);

        updateIngString();

        viewIngredients.setText(ingredientList);
    }//end of update ingredients

    private void updateIngString() {
        //While ings is not empty

        Ingredient current;
        while (!ings.isEmpty() && ings.size() > ingPos) {
            current = ings.get(ingPos);
            ingredientList += (" " + current.getAmount() + " " + current.getName() + "    ");
            ingPos++;
        }
    }

    public void updateTags(View view) {
        final EditText editTag = findViewById(R.id.editTag);
        final TextView viewTags = findViewById(R.id.addedTags);

        String tagName = editTag.getText().toString();

        GeneralElement tag = new GeneralElement(tagName);

        tags.add(tag);

        updateTagString();

        viewTags.setText(tagList);

    }

    private void updateTagString() {
        GeneralElement current;

        while (!tags.isEmpty() && tags.size() > tagPos) {
            current = tags.get(tagPos);
            tagList += (" " + current.getName());
            tagPos++;
        }

    }

}
