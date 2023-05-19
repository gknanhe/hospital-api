const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hospital_api');

const db = mongoose.connection;

db.on('error',console.error.bind('error in connecting Database'));

db.once('open', function(){
    console.log("Connected to Database:: MongoDB");
    
})

module.exports = db;

