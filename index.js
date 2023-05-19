// env 
require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT


app.listen(port, function(err){
    if(err){
        console.log('Error', err);
        return;
    }

    console.log(`running on port: ${port}`);
})