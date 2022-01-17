package comp3350.chefs_collection.Presentation.ListAdapters;

import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessSubList;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Presentation.BrowseSublistActivity;
import comp3350.chefs_collection.Presentation.ViewSublistActivity;
import comp3350.chefs_collection.R;

public class SublistAdapter extends ArrayAdapter<GeneralElement> {

    private final Context context;

    public SublistAdapter(Context context, int resource) {
        super(context, resource);
        this.context = context;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = null;
        final GeneralElement element = getItem(position);
        final AccessSubList access = Service.getAccessSubList();


        if (convertView == null) {
            view = View.inflate(context, R.layout.activity_browse_sublist, null);
        } else {
            view = convertView;
        }

        TextView title = view.findViewById(R.id.sublist_name);

        title.setText(element.getName());

        title.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                int sublistId = element.getUid();
                Intent intent = new Intent(context, ViewSublistActivity.class);
                intent.putExtra("sId", sublistId);
                //Close Browse History
                ((BrowseSublistActivity) context).recreate();
                context.startActivity(intent);
            }
        });

        //Set when remove sublist button is clicked
        Button button = view.findViewById(R.id.remove_sublist);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                access.deleteElement(element);
                ((BrowseSublistActivity) context).recreate();
            }
        });

        return view;
    }
}
