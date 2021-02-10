const Users = require('../models/userModel')
const { toData } = require('../auth/jwt')

function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  // const auth = req.headers["authorization"]
  console.log("auth is", auth)
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
     
      Users
        .findByPk(data.uuid)
        .then(user => {
          if (!user) return res.status(401).send({message: "User does not exist", success: false, authorized: false })

          console.log("User in authMiddleware", user.dataValues)
          req.user = user
          next()
        })
        .catch(next)
    }
    catch(error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
}

module.exports = auth
