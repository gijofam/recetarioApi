const bcrypt = require('bcrypt')

// bcrypt.hash()

const hashPassword = (plainPassword) => {
//   const hashedPassword = bcrypt.hashSync(plainPassword, 10)
//   return hashedPassword
return bcrypt.hashSync(plainPassword, 10)
}

// comparar si la contraseña root es igual al resultado encriptado
const comparePassword = (plainPassword, hashedPassword) => {
//   esta funcion de usa para comparar si la contraseña ingresada por 
// el usuario es igual a la que se tiene hasheado en el registro del BD
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

// console.log(hashPassword('root'))

// console.log(comparePassword('root', '$2b$10$QR1CpdOItQAqwKWpPDx2WeV5oDYPS34DTqGJuykaAYQfj2Dgz02my'))

// ****************+++++++++++

module.exports = {
    hashPassword,
    comparePassword
}