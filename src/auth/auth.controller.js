// necesitamos Email y contraseña del usuario

const {getUserByEmail} = require('../users/users.controllers')
const {comparePassword} = require('../utils/crypto')

// el email es unico en mi base de datos

const loginUser = async (email, password) => {
    // este comtrolador tiene 2 posibles respuestas
    //  1 las credenciales son validas y retorna el usuario
    //  2 las credenciales son invalidas y retornamos false
    try{
        const user = await getUserByEmail(email)
        // user.password contiene la contrasela encryptada
        const verifyPassword = comparePassword(password,user.password)
        if(verifyPassword){
            return user
        }
        return false
    }catch (err){
        return false
    }
    // ***con esto no podrian usar el return****
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
   
}


module.exports = {loginUser}
// loginUser('sahid.kick@academlo.com', 'root')