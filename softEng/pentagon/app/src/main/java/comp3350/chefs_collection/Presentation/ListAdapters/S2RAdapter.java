package comp3350.chefs_collection.Presentation.ListAdapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessRecipe;
import comp3350.chefs_collection.Logic.AccessSubList2Recipe;
import comp3350.chefs_collection.Objects.Recipe;
import comp3350.chefs_collection.Objects.SubListToRecipe;
import comp3350.chefs_collection.Presentation.ViewRecipeActivity;
import comp3350.chefs_collection.Presentation.ViewSublistActivity;
import comp3350.chefs_collection.R;

public class S2RAdapter extends ArrayAdapter<SubListToRecipe> {

    private final int layoutId;
    private final Context context;

    //Constructor
    public S2RAdapter(Context context, int resource) {
        super(context, resource);
        this.context = context;
        this.layoutId = resource;
    }//end of constructor

    @Override
    public View getView(int pos, View viewP, ViewGroup parent) {
        View view = null;
        SubListToRecipe s2r = getItem(pos);
        AccessRecipe accessRecipe = Service.getAccessRecipe();
        AccessSubList2Recipe accessSubList2Recipe = Service.getAccessS2R();
        Recipe recipe = accessRecipe.getRecipe(s2r.getRUID());

        //If no convert view
        if (viewP == null) {
            LayoutInflater lInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = lInflater.inflate(layoutId, null);
        } else {
            view = viewP;
        }

        TextView title = view.findViewById(R.id.S2R_name);

        title.setText(recipe.getName());

        //When title is clicked it should go to that recipe
        title.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                int recipeId = recipe.getUID();
                Intent intent = new Intent(context, ViewRecipeActivity.class);
                intent.putExtra("rId", recipeId);
                //Close Browse History
                ((ViewSublistActivity) context).recreate();
                context.startActivity(intent);
            }
        });

        //Set when remove history button is clicked
        Button button = view.findViewById(R.id.remove_S2R);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                accessSubList2Recipe.deleteElement(s2r);
                ((ViewSublistActivity) context).recreate();
            }
        });
        return view;
    }//end of get view

}
