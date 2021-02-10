const bcrypt = require('bcrypt')
const Users = require('../models/userModel')

const createUser = (req, res, next) => {
	const { email, password, name } = req.body;
	console.log("creating user", email, name)
	// All data should be provided
	if (email && password && name) {
		const user = {
			email,
			password: bcrypt.hashSync(password, 10),
            name
		};

		// check if email or username is already used
		Users.findOne({
			where: { email },
			attributes: ['email']
		})
			.then(result => {
				if (result) {
					res.status(400).send({ "message": "Email already in use", "success" : false });
				}else{
					return Users.create(user)
				}
			})
			// .then(() => {
				
			// })
			.then(() => {
				res.status(201).send({"message": "Registration successfull", "success" : true})
			})
			.catch(console.error);
	} else {
		res.status(400).send({ "message": "Please provide the required information", "success" : false });
	}
}

const getUserProfile = (req, res, next) => {
    Users
    .findByPk(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(next)
}

module.exports = {
    createUser,
    getUserProfile
}