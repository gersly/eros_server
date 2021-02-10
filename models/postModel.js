const Sequelize = require('sequelize')
const db = require('../db')


const Posts = db.define('posts', {
    uuid:{
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    // category: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // }
});

module.exports = Posts;