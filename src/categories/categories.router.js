const router = require('express').Router()
const categoriesServices = require('./categories.services')
const passport = require('passport')
const adminValidate = require('../middlewares/role.middleware')
require('../middlewares/auth.middleware')(passport)

router.route('/')
    .get(categoriesServices.getAllCategories)
    .post(passport.authenticate('jwt', {session: false}), adminValidate, categoriesServices.PostCategory)
    // .post(categoriesServices.PostCategory)

router.route('/:id')
    .get(categoriesServices.getCategoryById)
    .delete(passport.authenticate('jwt', {session: false}), adminValidate, categoriesServices.deleteCategory)
    // .delete(categoriesServices.deleteCategory)


module.exports = router