//using passport-jwt for authentication
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;   //to extract req data

const Doctor = require('../models/doctor');
console.log(process.env.jwtKey,'jwtkey')
//setting up option fot passport
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtKey,
}

//setting up passport by using jwt strategy
passport.use(
    new JWTStrategy(opts, async function (jwtPayLoad, done) {

        try {
            const user = await Doctor.findById(jwtPayLoad._id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.log('Error in finding user from JWT', error);
            return;
        }
    })
);

module.exports = passport;