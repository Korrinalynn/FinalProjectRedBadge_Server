require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require("./db");

const user = require("./controllers/user-controller");
const character = require("./controllers/character-controller");
const marketplace = require("./controllers/marketplace-controller");

sequelize.sync();
// sequelize.sync({force:true});

app.use(express.json());

app.use("/user", user);
app.use("/character", character);
app.use("/marketplace", marketplace);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
})