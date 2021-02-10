const Sequelize = require('sequelize');
const databaseURL = 'postgres://yffprazuilurai:8668db1837c7e4dfddb743fcc35f171c721e12ef75016402739e9f20daf090c1@ec2-35-174-118-71.compute-1.amazonaws.com:5432/da03jpkkhgrnk4' || 'postgres://postgres:secret@localhost:5432/postgres';
const db = new Sequelize(databaseURL);

module.exports = db;