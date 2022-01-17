## Database Setup
The setup of MongoDB consists of the following steps: 

1. Go to the `backend` directory, copy and paste the file `.env.example` in the same directory, renaming it to `.env`.

2. Each of the environments have their own key (i.e. each environment has a different database). To setup all of them, copy and paste the keys located in the project's [wiki page](https://github.com/ahmedkidwai/Tripmate/wiki) into `.env`

3. To install the npm packages, using command line, go to the `backend` directory and enter `npm install`.

4. Now that we have all the required packages, we can initiate  MongoDB database connection with the command `node server.js`. You should see the message `MongoDB database connection established successfully`. 

5. In your browser, access `http://localhost:5000/user` to see what's in the database.  
