package comp3350.chefs_collection.Presentation.ListAdapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Presentation.BrowseHistory;
import comp3350.chefs_collection.Presentation.ViewRecipeActivity;
import comp3350.chefs_collection.R;

public class HistoryListAdapter extends ArrayAdapter<Recipe> {

    private final int layoutId;
    private final Context context;

    //Constructor
    public HistoryListAdapter(Context context, int textViewId) {

        super(context, textViewId);
        this.context = context;
        this.layoutId = textViewId;
    }//end of constructor

    @Override
    public View getView(int pos, View viewP, ViewGroup parent) {
            View view = null;
            final Recipe recipe = getItem(pos);
        final AccessRecipe access = Service.getAccessRecipe();

            //If no convert view
        if (viewP == null) {
            LayoutInflater lInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                view = lInflater.inflate(layoutId, null);
            } else {
                view = viewP;
            }

            TextView title = view.findViewById(R.id.history_name);

            title.setText(recipe.getName());


            //When title is clicked it should go to that recipe
        title.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                int recipeId = recipe.getUID();
                    Intent intent = new Intent(context, ViewRecipeActivity.class);
                intent.putExtra("rId", recipeId);
                    //Close Browse History
                ((BrowseHistory) context).recreate();
                    context.startActivity(intent);
                }
            });

            //Set when remove history button is clicked
            Button button = view.findViewById(R.id.remove_history);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                    access.removeHistory(recipe.getUID());
                ((BrowseHistory) context).recreate();
                Toast.makeText(context, "Recipe Removed From History", Toast.LENGTH_SHORT).show();
                }
            });

            return view;
    }//end of get view


}
