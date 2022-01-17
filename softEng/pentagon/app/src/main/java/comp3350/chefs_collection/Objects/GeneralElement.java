package comp3350.chefs_collection.Objects;

//tag and sublist has same structure
public class GeneralElement {

    private int uid;
    private final String name;

    public GeneralElement(String name) {
        this.name = name;
    }


    public GeneralElement(int uid, String name) {
        this.uid = uid;
        this.name = name;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GeneralElement that = (GeneralElement) o;
        return uid == that.uid && name.equals(that.name);

    }

    @Override
    public String toString() {
        return "GeneralElement{" +
                "uid=" + uid +
                ", name='" + name + '\'' +
                '}';
    }

}
