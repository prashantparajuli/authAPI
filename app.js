const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');

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