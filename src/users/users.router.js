const router = require('express').Router()

const passport = require('passport')

const userServices = require('./users.services')

const adminValidate = require('../middlewares/role.middleware')
require('../middlewares/auth.middleware')(passport)

// require('../middlewares/auth.middleware')(passport)

// ruta raiz
// router.get('/', 
//   passport.authenticate('jwt', {session: false}),
//   userServices.getAllUsers)

router.get('/', 
  userServices.getAllUsers)

// TODO el registerUser ira en la ruta /auth/register

// ruta de informacion propia del usuario loggeado
router.route('/me')
  .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
  // tarea hacer estos dos que sobran el path y delete, tenemos que realizar sus dos services en users.services.
  .patch(passport.authenticate('jwt', {session: false}), userServices.updateMyUser)
  .delete(passport.authenticate('jwt', {session: false}), userServices.deleteMyUser)

// TODO agregar la ruta para optener mis recetas 

// rutas dinamicas por ID /users/:id
// router.get('/:id')
// router.patch('/:id')
// router.put('/:id')
// router.delete('/:id')

router.route('/:id')
  .get(userServices.getUserById)
  // .patch(userServices.patchUser)
  // .delete(userServices.deleteUser)
  .patch(passport.authenticate('jwt', {session: false}),
  adminValidate,
  userServices.patchUser)
  .delete(passport.authenticate('jwt', {session: false}),
  adminValidate,
  userServices.deleteUser)


  module.exports = router


