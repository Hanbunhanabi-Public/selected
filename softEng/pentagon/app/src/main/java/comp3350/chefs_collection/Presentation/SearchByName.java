package comp3350.chefs_collection.Presentation;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;

import comp3350.chefs_collection.R;

public class SearchByName extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_by_name);
    }

    public void searchByName(View view) {
        String string = "";
        EditText editText = findViewById(R.id.searchText);

        if (editText.getText().toString() != null) {
            string = editText.getText().toString();
        }

        Intent intent = new Intent(this, SearchResults.class);
        intent.putExtra("string", string);
        startActivity(intent);
    }
}
