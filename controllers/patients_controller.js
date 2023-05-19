const Patient = require('../models/patient');
const Report = require('../models/report');

const mongoose = require('mongoose');

//Fucntion to registered a new patient by mobile number, if patient exist return the patients details.
//Input: phone, name(optional), age(optional), gender(optional)

module.exports.register = async function(req, res){
    try {
        let patient = await Patient.findOne({phone: req.body.phone});

        if(patient){
            console.log(patient,'patient')
            return res.status(200).send({
                patient:patient,
                message:  "user alredy exist",

            });
            
        }

        let newPatient = await Patient.create(req.body);

        if(newPatient){
            return res.status(200).send({
                patient:newPatient,
                isRegistered: true,
                message: "User registered",
            });
        }


    } catch (error) {
        console.log('error', error);
        return res.status(500).send({
            isRegistered: false,
            message: 'Internal server error'
        });
    }
}

// create report of a patient
//Input: doctor Id, Patient Id, status, date(default = todays date)

module.exports.createReport = async  function(req, res){
    try {
        let report = await Report.create({
            doctor: req.body.doctor,
            patient: req.params.id,
            status: req.body.status,
            date: req.body.date ? req.body.date : Date.now(), 
        });

        if(report){
            console.log(report,'report');
            return res.status(200).send({
                report: report,
                message: 'report created successfully'
            })
        }

    } catch (error) {
        console.log('Internal Server Error',error);
        return res.status(500).send({
            err: error,
            isReportCreated: false,
            message: 'Internal Server Error',
        });
    }
}

//get all reports
module.exports.reportsOfPatient = async function(req, res){
    try {
        let reports = await Report.find({patient: req.params.id});

        if(reports){
            return res.status(200).send({
                reports: reports,
                message: "all reports of patient"
            })
        }


    } catch (error) {
        console.log('Internal Server Error',error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
}