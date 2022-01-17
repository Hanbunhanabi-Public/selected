# React Redux Web-Application

## Chrome dev tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## Launch server
Before launching the React-Redux front-end we will want to first start up the backend server to be able to serve api
requests.

1) In the `backend` directory run: `npm install` to install the required node dependencies
2) Run: `node server.js`, this launches the server on `http://localhost:5000`

*note:* you can make api requests without interaction from the front-end by using [Postman](https://www.postman.com/)
and making a web request to `http://localhost:5000/[apiRoute]`<br/>
* example: making a `GET` request using Postman to `http://localhost:5000/user` will get all the users

## Available scripts for React front-end

In the `web-application` directory, first run `npm install` to install the necessary node dependencies. Then run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Other available scripts

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Local vs Production
One thing to note here is that locally we're running the front-end and back-end separately, with the front-end being
run on port `3000` while the back-end runs on port `5000`.<br/>
This renders this server code unnecessary in a local setting:<br/>
```
app.use(express.static(path.join(__dirname, '../web-application/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'web-application', 'build', 'index.html'))
});
```
However, in a production setting the `npm build` script will be run, bundling/minimizing our static assets.
In this case, the server code above will play the role of serving up our React App when a request is made to
`http://localhost/` (in production this would be our EC2 domain/IP).
