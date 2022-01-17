package comp3350.chefs_collection.Objects;

public class SubListToRecipe {


    private final int RUID;
    private final int SUID;

    public SubListToRecipe(int SUID, int RUID) {
        this.RUID = RUID;
        this.SUID = SUID;
    }

    public int getRUID() {
        return RUID;
    }

    public int getSUID() {
        return SUID;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubListToRecipe s2R = (SubListToRecipe) o;
        return RUID == s2R.RUID &&
                SUID == s2R.SUID;
    }

    @Override
    public String toString() {
        return "SubListToRecipe{" +
                "RUID=" + RUID +
                ", SUID=" + SUID +
                '}';
    }

}
