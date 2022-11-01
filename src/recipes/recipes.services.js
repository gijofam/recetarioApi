const recipeControllers = require('./recipes.controller')

const getAllRecipes = (req, res) => {
    recipeControllers.getAllRecipes()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(200).json({message: err.message})
        })
}
const getRecipeById = (req, res) => {
    const id = req.params.recipe_id
    recipeControllers.getRecipeById()
        .then(data => {
            if(data)
                res.status(204).json(data)
            else
                res.status(404).json({message: 'Invalid ID'})
        })
        .catch(err => {
            res.status(200).json({message: err.message})
        })
}
const createRecipe = (req, res) => {
    const userId = req.user.id
    const {title, description, urlImg, time, portions, categoryId, origin} = req.body
    if(title && description && time && portions && categoryId ){
        recipeControllers.createRecipe({title,description, time, portions, categoryId})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    }else{
        res.status(400).json({
            message: 'Missing Data',
            fields: {
                title: 'string',
                description: 'string',
                time: 'number',
                protions: 'string',
                categoryId: 'number'
            }
        })
    }
}
const patchRecipe = (req, res) => {
    const {title, description, urlImg, time, portions, categoryId} = req.body
    const id = req.params.recipe_id
    recipeControllers.updateRecipe(id, {title, description, urlImg, time, portions, categoryId})
        .then(data => {
            if(data[0])
                res.status(200).json({message: `Recipe with ID: ${id}, edited succesfully`})
            else
                res.status(404).json({message: 'Invalid ID', id})
        })
        .catch(err => {
            res.status(200).json({message: err.message})
        })
}

const deleteRecipe = (req, res) => {
    const id = req.params.recipe
    recipeControllers.deleteRecipe(id)
        .then(data => {
            if(data)
                res.status(204).json()
            else    
                res.status(404).json({message: 'Invalid ID', id})
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    patchRecipe,
    deleteRecipe
}