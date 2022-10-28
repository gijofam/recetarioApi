const Ingredients = require('./ingredients.models')
const Recipes = require('./recipes.models')
const Users = require('./users.models')
const UsersIngredients = require('./users_ingredients.models')
const Instructions = require('./instructions.models')
const Categories = require('./categories.models')
const UsersRecipes = require('./users_recipes.models')
const Type = require('./types.models')
const RecipesIngredients = require('./recipes_ingredients.models')

const initModels = () => {
    Users.belongsTo(Recipes)
    Recipes.hasMany(Users)

    Users.belongsTo(UsersIngredients)
    UsersIngredients.hasMany(Users)

    Users.belongsTo(UsersRecipes)
    UsersRecipes.hasMany(Users)

    Recipes.belongsTo(UsersIngredients)
    UsersIngredients.hasMany(Recipes)

    Recipes.belongsTo(Instructions)
    Instructions.hasMany(Recipes)
    
    Recipes.belongsTo(UsersRecipes)
    UsersRecipes.hasMany(Recipes)

    Recipes.belongsTo(RecipesIngredients)
    RecipesIngredients.hasMany(Recipes)

    Categories.belongsTo(Recipes)
    Recipes.hasMany(Categories)

    Type.belongsTo(Ingredients)
    Ingredients.hasMany(Type)

    Ingredients.belongsTo(RecipesIngredients)
    RecipesIngredients.hasMany(Ingredients)

}


module.exports = initModels