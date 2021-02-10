const login = (req, res) =>{
    res.status(200).send({"path" : "login"})
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