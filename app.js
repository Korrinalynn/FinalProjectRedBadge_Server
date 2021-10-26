require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require("./db");

const user = require("./controllers/user-controller");
const character = require("./controllers/character-controller")

sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());

app.use("/user", user);
app.use("/character", character)

app.listen(3000, function(){
    console.log('App is listening on port 3000');
})

/****** template *****/
// require("dotenv").config();
// const Express = require("express");
// const db = require("./db");

// const app = Express();

// // Import middlewares as a bundle
// const middlewares = require("./middleware");

// // Import controllers as a bundle
// const controllers = require("./controllers");

// // Parse the body of all requests as JSON
// app.use(Express.json());
// app.use(middlewares.CORS)
// app.use("/user", controllers.User);

// const resetDatabase = {force:true}
// db.authenticate()
// // add a resetDatabase inside the db.sync to drop all your tables if needed
// // example:  .then(() => db.sync(resetDatabase))
//   .then(() => db.sync())
//   .then(() =>
//     app.listen(process.env.PORT, () => {
//       console.log(`[server]: App is listening on ${process.env.PORT}`);
//     })
//   )
//   .catch((e) => {
//     console.log("[server]: Server Crashed");
//     console.log(e);
//   });