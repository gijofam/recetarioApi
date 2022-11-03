const Recipes = require('../models/recipes.models')
const uuid = require('uuid')
const {Op} = require('sequelize')
const Users = require('../models/users.models')
const Categories = require('../models/categories.models')
const Instructions = require('../models/instructions.models')
const RecipeIngredients = require('../models/recipes_ingredients.models')
const Ingredients = require('../models/ingredients.models')
const Types = require('../models/types.models')
const UsersIngredients = require('../models/users_ingredients.models')

const getAllRecipes = async () => {
    const data = await Recipes.findAll({
        attributes: {
            exclude: ['userId', 'categoryId', 'createAd', 'updateAt']
        },
        include: [
            {
                model: Categories,
            },
            {
                model: Users,
                attributes: ['id', 'firstName', 'firstName']
            },
            {
                model: Instructions,
                attributes: [ 'step', 'description']
            }, 
            {
                model: RecipeIngredients,
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ]
    })
    return data
}

const getRecipeById = async (id) => {
    const data = await Recipes.findOne({
        where: {
            id
        },
        attributes: {
            exclude: ['userId', 'categoryId', 'createAd', 'updateAt']
        },
        include: [
            {
                model: Categories,
            },
            {
                model: Users,
                attributes: ['id', 'firstName', 'firstName']
            },
            {
                model: Instructions,
                attributes: [ 'step', 'description']
            }, 
            {
                model: RecipeIngredients,
                include: {
                    model: Ingredients,
                    include: {
                        model: Types
                    }
                }
            }
        ]
    })
    return data
}

const createRecipe = async (data) => {
    const response = await Recipes.create({
        id: uuid.v4(),
        title: data.title,
        description: data.description,
        urlImg: data.urlImg,
        time: data.time,
        portions: data.portions,
        userId: data.userId,
        categoryId: data.categoryId,
        origin: data.origin,
        likes: data.likes
    })
    return response
}

const updateRecipe = async (data) => {
    const response = await Recipes.update(data, {
        where: {
            id
        }
    })
    return response
}

const deleteRecipe = async (id) => {
    const data = await Recipes.destroy({
        where: {
            id
        }
    })
    return data
}

const getMyRecipes = async (userId) => {
    const userIngredients = UsersIngredients.findAll({
        attributes: ['ingredientId'],
        where: {
            userId,
        }
    })

    const filteredIngredients = userIngredients.map(obj => obj.ingredientId)
    const recipeIngredients = await RecipeIngredients.findAll({
        where: {
            ingredientId: {
                [Op.in]: filteredIngredients
            }
        }
    })
   
    const filteredRecipes = recipeIngredients.map(obj => obj.recipeId)
    const data = await Recipes.findAll({
        where: {
            id: {
                [Op.in]: filteredRecipes
            }
        }
    })
    return data
}

getMyRecipes('ecdc7c8a-2df0-4457-ac3e-5549b03a902c')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}

