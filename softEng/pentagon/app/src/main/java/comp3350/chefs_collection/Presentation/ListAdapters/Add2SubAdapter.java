package comp3350.chefs_collection.Presentation.ListAdapters;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessSubList2Recipe;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Logic.Exceptions.UIDException;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Objects.SubListToRecipe;
import comp3350.chefs_collection.R;

public class Add2SubAdapter extends ArrayAdapter<GeneralElement> {

    private final Context context;
    private final int rUID;
    private AccessSubList2Recipe aS2R;

    public Add2SubAdapter(Context context, int resource, int rUID) {
        super(context, resource);
        this.context = context;
        this.rUID = rUID;
    }


    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = null;
        final GeneralElement element = getItem(position);
        aS2R = Service.getAccessS2R();

        if (convertView == null) {
            view = View.inflate(context, R.layout.addsub_list_item, null);
        } else {
            view = convertView;
        }

        TextView title = view.findViewById(R.id.sub_name);

        title.setText(element.getName());
        //When button is pressed
        Button button = view.findViewById(R.id.add2listbutton);

        SubListToRecipe subToRecipe = new SubListToRecipe(element.getUid(), rUID);

        ArrayList<SubListToRecipe> addedList = (ArrayList<SubListToRecipe>) aS2R.fetchAllElementBySUID(element.getUid());
        if (addedList.contains(subToRecipe))
            button.setBackgroundColor(746038);


        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                String errorMsg = "invalid recipe or sublist";


                aS2R = Service.getAccessS2R();

                try {
                    if (aS2R.addElement(subToRecipe))
                        Toast.makeText(context, "Recipe added to Sublist: " + title.getText().toString(), Toast.LENGTH_SHORT).show();
                    else
                        Toast.makeText(context, "can't add into same Sublist twice", Toast.LENGTH_SHORT).show();
                } catch (UIDException e) {
                    Toast.makeText(context, errorMsg, Toast.LENGTH_SHORT).show();
                } catch (NameException e) {
                    Toast.makeText(context, errorMsg, Toast.LENGTH_SHORT).show();
                }
                button.setBackgroundColor(746038);
            }


        });
        return view;
    }
}
