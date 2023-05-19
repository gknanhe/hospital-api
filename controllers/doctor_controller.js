const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

//Fucntion to register a new doctor, if doctor not exist in system
//Input:username, name, passowrd

module.exports.register = async function(req, res){
    try {
        console.log(req.body,'body');

        let user = await Doctor.findOne({ username: req.body.username });
        if (user) {
            return res.status(200).send({
                isRegistered: false,
                // data: user,
                message: 'User already exist',
            });
        }

        let newUser = await Doctor.create({
            name: req.body.name ? req.body.name : req.body.username ,
            username: req.body.username,
            password: req.body.password
        });

        console.log(newUser,'doctor');

        if (newUser) {
            return res.status(200).send({    //res.send() => it can handle strings, HTML, JSON, Buffers, and even files.
                isRegistered: true,
                data : newUser,
                message: 'User registered',
            });
        }

    } catch (error) {
        console.log('Internal servar error', error);
        return res.status(500).send({
            isRegistered: false,
            message: 'Internal Server Error',
        });
    }
};

//Fucntion to login existing doctor doctor, if crdentials provided are correct it return JWT to be used for further use
//Input:username, passowrd

module.exports.login = async function(req, res){
    try {
        console.log(req.body,'body');
        let user = await Doctor.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if(user){
            return res.status(200).send({
                isAuthenticated: true,
                token: jwt.sign(user.toJSON(), process.env.jwtKey, { expiresIn: '1h' }),  //conver user to obj and encript by key and generat token
            })
        }else{
            return res.status(422).send({
                isAuthenticated: false,
                message: "Invalid Credentials",
            })
        }


    } catch (error) {
        console.log('Internal servar error', error);

        return res.status(500).send({
            isAuthenticated: false,
            message: 'Internal Server Error',
        });
    }
}