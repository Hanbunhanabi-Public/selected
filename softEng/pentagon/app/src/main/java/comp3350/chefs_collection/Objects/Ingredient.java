package comp3350.chefs_collection.Objects;

import java.util.Objects;

public class Ingredient {
    private final String name;
    private final String amount;
    private int RUID;

    public Ingredient(int RUID, String name, String amount) {
        this.name = name;
        this.amount = amount;
        this.RUID = RUID;
    }

    public String getAmount() {
        return amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ingredient that = (Ingredient) o;
        return Objects.equals(name, that.name) && RUID == that.RUID;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "name='" + name + '\'' +
                ", amount='" + amount + '\'' +
                ", RUID=" + RUID +
                '}';
    }


    public String getName() {
        return name;
    }

    public int getRUID() {
        return RUID;
    }

    public void setRUID(int RUID) {
        this.RUID = RUID;
    }
}
