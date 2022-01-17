package comp3350.chefs_collection.Presentation;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import comp3350.chefs_collection.Application.Service;
import comp3350.chefs_collection.Logic.AccessSubList;
import comp3350.chefs_collection.Logic.Exceptions.NameException;
import comp3350.chefs_collection.Objects.GeneralElement;
import comp3350.chefs_collection.R;

public class AddSublist extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_sublist);
    }

    public void submitSublist(View view) {
        String name = "";


        final EditText editName = findViewById(R.id.editSublist);

        name = editName.getText().toString();

        GeneralElement element = new GeneralElement(name);
        AccessSubList accessSubList = Service.getAccessSubList();
        try {
            if (accessSubList.addElement(element))
                Toast.makeText(this, "sublist add successful", Toast.LENGTH_SHORT).show();
            else
                Toast.makeText(this, "can't add same name sublist twice", Toast.LENGTH_SHORT).show();
        } catch (NameException e) {
            Toast.makeText(this, "invalid sublist name", Toast.LENGTH_SHORT).show();
        }

        finish();
    }
}
