const { toJWT, toData } = require('../auth/jwt');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

const login = (req, res, next) =>{
    const email =  req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(401).send({
            success: false,
            message: 'Please supply a valid Email and Password'
        })
    } else {
        // 1. find user based on email address
        Users.findOne({
            where: {
                email: email
            }
        })
            .then(entity => {
                if (!entity) {
                    res.status(404).send({
                        success: false,
                        message: 'User with that email does not exist'
                    })
                }

                // 2. use bcrypt.compareSync to check the password against the stored hash
                else if (bcrypt.compareSync(req.body.password, entity.password)) {

                    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
                    res.send({
                        jwt: toJWT({ userId: entity.id }),
                        // userId: entity.id,
                        // email: entity.email,
                        // name: entity.name
                    })
                }
                else {
                    res.status(401).send({
                        success: false,
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                // console.error(err)
                res.status(500).send({
                    message: 'Something went wrong'
                })
            })
    }
}

const checkToken = (req, res) => {
    res.status(200).send({
        "path": "check token validity"
    })
}

module.exports = {
    login,
    checkToken
}