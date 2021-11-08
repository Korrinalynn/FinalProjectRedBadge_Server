require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require("./db");

const character = require("./controllers/character-controller");
const questions = require("./controllers/questions-controller");
const answers = require("./controllers/answers-controller");
// const marketplace = require("./controllers/marketplace-controller");   **stretch goal**

sequelize.sync();
// sequelize.sync({force:true});

app.use(express.json());

app.use("/character", character);
app.use("/questions", questions);
app.use("/answers", answers);
// app.use("/marketplace", marketplace);    **stretch goal**

app.listen(3000, function () {
    console.log('App is listening on port 3000');
})