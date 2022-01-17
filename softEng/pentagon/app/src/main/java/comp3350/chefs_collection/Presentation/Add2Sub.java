package comp3350.chefs_collection.Presentation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ListView;

import java.util.List;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessSubList;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.Presentation.ListAdapters.Add2SubAdapter;
import comp3350.chefs_collection.R;

public class Add2Sub extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add2_sub);

        //Get uid from intent
        Intent intent = getIntent();
        int rUID = intent.getIntExtra("rId", 0);

        //Set up adapter
        Add2SubAdapter adapter = new Add2SubAdapter(this, R.layout.addsub_list_item, rUID);
        ListView lv = findViewById(R.id.add2SubListView);
        lv.setAdapter(adapter);

        //Populate sublist List
        AccessSubList accessSub = Service.getAccessSubList();
        List<GeneralElement> list = accessSub.fetchAllElement();

        //Fill adapter
        adapter.addAll(list);


    }

    public void done(View view) {

        finish();
    }
}
