package comp3350.chefs_collection.Objects;


import java.sql.Timestamp;

public class Recipe {

    private final String name;
    private final String content;
    private int UID;
    private int rating;
    private Timestamp history;
    private final String comment;


    private final boolean isDisplay;


    @Override
    public String toString() {
        return "Recipe{" +
                "name='" + name + '\'' +
                ", content='" + content + '\'' +
                ", UID=" + UID +
                ", rating=" + rating +
                ", history=" + history +
                ", comment='" + comment + '\'' +
                ", isDisplay=" + isDisplay +
                '}';
    }

    //create a empty recipe
    public Recipe() {
        this.name = "";
        this.content = "";
        this.UID = -1;
        this.rating = 0;
        this.comment = "";
        this.history = null;
        this.isDisplay = false;
    }

    //use for fetch and transmit recipe from database to logic, also used for program inner process
    public Recipe(String name, String content, int UID, int rating, String comment, Timestamp history, boolean isDisplay) {
        this.name = name;
        this.content = content;
        this.UID = UID;
        this.rating = rating;
        this.comment = comment;
        this.history = history;
        this.isDisplay = isDisplay;


    }

    // use for a add a recipe
    public Recipe(String name, String content, int rating, String comment, Timestamp history, boolean isDisplay) {
        this.name = name;
        this.content = content;
        this.UID = -1;
        this.rating = rating;
        this.comment = comment;

        this.history = history;
        this.isDisplay = isDisplay;

    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return UID == recipe.UID;

    }


    // getter and setter
    public String getName() {
        return name;
    }

    public String getContent() {
        return content;
    }


    public int getUID() {
        return UID;
    }

    public void setUID(int UID) {
        this.UID = UID;
    }


    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }


    public Timestamp getHistory() {
        return history;
    }

    public void setHistory(Timestamp history) {
        this.history = history;
    }

    public boolean isDisplay() {
        return isDisplay;
    }


}
