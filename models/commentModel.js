const Sequelize = require('sequelize')
const db = require('../db')


const Comments = db.define('comments', {
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
    postUuid:{
        type: Sequelize.UUID,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

module.exports = Comments;
