package comp3350.chefs_collection.Presentation;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ListView;

import java.util.ArrayList;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessSubList;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Presentation.ListAdapters.SublistAdapter;
import comp3350.chefs_collection.R;

public class BrowseSublistActivity extends AppCompatActivity {

    private final AccessSubList access = Service.getAccessSubList();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Set up adapter
        SublistAdapter adapter = new SublistAdapter(this, R.layout.activity_browse_sublist);
        setContentView(R.layout.view_sublist);
        ListView lv = findViewById(R.id.sublistView);
        lv.setAdapter(adapter);

        ArrayList<GeneralElement> sublist = new ArrayList<>(access.fetchAllElement());

        adapter.addAll(sublist);

    }

}

