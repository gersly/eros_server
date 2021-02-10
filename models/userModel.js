const Sequelize = require('sequelize')
const db = require('../db')
const Posts = require('./postModel')
const Comments = require('./commentModel')

const Users = db.define('users', {
    uuid:{
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING, 
        allowNull: false,
    }
});

Users.hasMany(Posts)
Users.hasMany(Comments)
// Comments.belongsTo(Users)
Posts.belongsTo(Users)

module.exports = Users;