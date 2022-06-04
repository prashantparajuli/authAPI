require('./dbconnection');
require('dotenv/config');

const express = require('express');
const app = express();


//import routes
const userRoute = require('./routes/user');


//middleware
app.use(express.json());


//defining router
const api = process.env.API;
app.use(`${api}/users`, userRoute);



//server config
const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`server running and listening on ${PORT}`);
})