package comp3350.chefs_collection;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import comp3350.chefs_collection.IntegrationTest.ExternalPersistenceTest;
import comp3350.chefs_collection.IntegrationTest.I2RHSQLDBTest;
import comp3350.chefs_collection.IntegrationTest.RecipeHSQLDBTest;
import comp3350.chefs_collection.IntegrationTest.S2RHSQLDBTest;
import comp3350.chefs_collection.IntegrationTest.SubListHSQLDBTest;
import comp3350.chefs_collection.IntegrationTest.T2RHSQLDBTest;


@RunWith(Suite.class)
@Suite.SuiteClasses({
        I2RHSQLDBTest.class,
        RecipeHSQLDBTest.class,
        S2RHSQLDBTest.class,
        SubListHSQLDBTest.class,
        T2RHSQLDBTest.class,
        ExternalPersistenceTest.class
})

public class AllIntegrationTest {


}


