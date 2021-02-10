const Sequelize = require('sequelize')
const db = require('../db')


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



module.exports = Posts;