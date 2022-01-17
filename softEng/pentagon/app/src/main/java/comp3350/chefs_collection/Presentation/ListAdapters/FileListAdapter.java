package comp3350.chefs_collection.Presentation.ListAdapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.io.File;

import comp3350.chefs_collection.R;

public class FileListAdapter extends ArrayAdapter<File> {
    private final int layoutId;

    public FileListAdapter(Context context, int textViewId) {
        super(context, textViewId);
        this.layoutId = textViewId;

    }

    public View getView(int pos, View viewP, ViewGroup parent) {
        View view = null;
        final String fileName = getItem(pos).getName();
        if (viewP == null) {
            LayoutInflater lInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = lInflater.inflate(layoutId, null);
        } else
            view = viewP;
        TextView title = view.findViewById(R.id.folders);
        title.setText(fileName);
        return view;
    }
}
