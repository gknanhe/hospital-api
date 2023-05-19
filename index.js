// env 
require("dotenv").config();

require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT


const session = require('express-session');


const db = require('./config/mongoose');
const passport = require('passport');
const passportJwt = require('./config/passport-jwt-strategy');


//using json and urlencoded middlware to parse the json and submitted form
app.use(express.json());
app.use(
    express.urlencoded({ 
        extnded: true,
        })
    );


    app.use(session({
        secret: "something",
        resave: false,
        saveUninitialized: true
      }));
      
    
    //initialize passport
app.use(passport.initialize());
app.use(passport.session());


//using routes
app.use('/', require('./routes'));





app.listen(process.env.PORT, function(err){
    if(err){
        console.log('Error', err);
        return;
    }

    console.log(`running on port: ${port}`);
    return;
})