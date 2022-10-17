// middleware para proteger rutas


// ** 1.- revisar si existe un token.
// ** 2.- verificar si el token pertenece a un usuario valido
// ** 3.- Modificar el req y agregar  req.user con la informacion descencriptada del token

// estrategia: diferentes maneras de hacer un login (facebook, google, JWT, github)

const passport = require('passport');
const {jwtSecret} = require('../config');
const { getUserById } = require('../users/users.controllers');
const JwtStrategy = require('passport-jwt').Strategy; //? Passport maneja estrategias para las diferentes autenticaciones
const ExtractJwt = require('passport-jwt').ExtractJwt; // extrae los header de la peticion

// exportando funcion anonima
module.exports = (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    }
    passport.use(
        new JwtStrategy(options, async(decoded, done) => {
        // done(error, decoded)
        try{
            const response = await getUserById(decoded.id)
            if(!response){
                return done(null, false)
            }
            console.log('decoded JWT', decoded)
            return done(null, decoded)
        }catch(error){
            return done(error, false)
        }
        })
    )
}



