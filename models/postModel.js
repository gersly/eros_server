const Sequelize = require('sequelize')
const db = require('../db')
const Comments = require('./commentModel')
const Users = require('./userModel')

const Posts = db.define('posts', {
    uuid:{
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    userUuid:{
        type: Sequelize.UUID,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

module.exports = Posts;