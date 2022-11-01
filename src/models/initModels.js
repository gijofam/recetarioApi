const Ingredients = require('./ingredients.models')
const Recipes = require('./recipes.models')
const Users = require('./users.models')
const UsersIngredients = require('./users_ingredients.models')
const Instructions = require('./instructions.models')
const Categories = require('./categories.models')
const UsersRecipes = require('./users_recipes.models')
const Types = require('./types.models')
const RecipesIngredients = require('./recipes_ingredients.models')

const initModels = () => {
// hasMany llave foranea lleva dentro del parentesis
// belongTo llave foranea lleva en el primer parametro antes del punto

    Users.hasMany(Recipes)
    Recipes.belongsTo(Users)
    
    Recipes.hasMany(Instructions)
    Instructions.belongsTo(Recipes)
    
    
    Categories.hasMany(Recipes)
    Recipes.belongsTo(Categories) 
    
    Types.hasMany(Ingredients)
    Ingredients.belongsTo(Types)

    Recipes.hasMany(UsersRecipes)
    UsersRecipes.belongsTo(Recipes)
    
    Users.hasMany(UsersIngredients)
    UsersIngredients.belongsTo(Users)

    Users.hasMany(UsersRecipes)
    UsersRecipes.belongsTo(Users)
    
    Recipes.hasMany(RecipesIngredients)
    RecipesIngredients.belongsTo(Recipes)

    Ingredients.hasMany(UsersIngredients)
    UsersIngredients.belongsTo(Ingredients)

    Ingredients.hasMany(RecipesIngredients)
    RecipesIngredients.belongsTo(Ingredients)

}

module.exports = initModels