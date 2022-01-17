# Continuous Deployment
To make our lives easier we're adopting a continuous deployment strategy for getting our `development` and `master`
branch onto our test and production EC2 instances respectively.

To accomplish this we're utilizing a tool called [Buddy](https://buddy.works/). Buddy allows us to utilize
[GitHub Webhooks](https://developer.github.com/webhooks/) to deploy our code to our EC2 instances on a push to
a specified branch.

## The Pipline
![Continuous Deployment](./../images/cd_pipeline.png)

This is an image of our production pipeline, but our test pipeline follows the same set of steps. Upon a push to
`master` in this case (or `development` in the case of our test instance), our Buddy pipeline will check to see if
any changes to the `web-application` or `backend` directory have been made as these are the directories that house our
responsive mobile website.

Upon determining this, Buddy executes a series of **5 steps**:
1. Copy the required files (that Buddy manages from our GitHub repo) to our EC2 instance using SFTP.
2. Install the required node dependencies. i.e. `npm install`
3. Build our React front-end bundle. i.e. `npm run build`
4. Starting up our back-end server, which involves:
    * Stopping the process currently running our server
    * Copying our environment variable config into the `backend` directory
    * Starting the server back up in another process
5. Notifying slack of a successful or unsuccessful deployment if any of the above steps failed.
