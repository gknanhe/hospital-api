const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        
    },
    age: {
        type: String,
        
    },
    gender: {
        type: String,
        
    },
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;