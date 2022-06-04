const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

//import routes
const userRoute = require('./routes/user');


//middleware
app.use(express.json());


//defining router
const api = process.env.API;
app.use(`${api}/users`, userRoute);


//db connection
mongoose.connect(process.env.DB_CONNECTION_URI, { useUnifiedTopology: true }).then(() => {
    console.log('connected to database');
}).catch((err) => {
    console.log(err);
})


//server config
const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`server running and listening on ${PORT}`);
})