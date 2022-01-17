
package comp3350.chefs_collection.Presentation.ListAdapters;
//Custom array adapter used in presenting array list of recipes in a list view

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.R;

public class RecipeListAdapter extends ArrayAdapter<Recipe> {

    private final int layoutId;

    //Constructor
    public RecipeListAdapter(Context context, int textViewId){

        super(context,textViewId);
        this.layoutId = textViewId;
    }//end of constructor



    @Override
    public View getView(int pos, View viewP, ViewGroup parent){
            View view = null;
            Recipe recipe = getItem(pos);

            //If no convert view
        if (viewP == null) {
            LayoutInflater lInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                view = lInflater.inflate(layoutId, null);
            } else {
                view = viewP;
            }

            TextView title = view.findViewById(R.id.recipe_name);

            title.setText(recipe.getName());

            return view;
    }//end of get view



}
