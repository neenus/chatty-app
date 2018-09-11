Chatty-App 
=====================

A simple Node.js chat web application using ReactJS as front-end client and express as a back-end server using websockets 

=====================

Back-end server assets and dependencies are in chatty_server folder.

Install the dependencies and start Express server.

```
npm install
node server.js
```
=====================

All ReactJS assets and dependencies are in chatty_client folder.

Install the dependencies and start ReactJS client.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### ReactJS Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

### Backend Server Dependencies

* Express
* [Websockets (ws)](https://www.npmjs.com/package/ws)
