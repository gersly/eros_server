const getCommentsByPostId = (req, res) => {
    res.status(200).send({
        "path" : "get comments by post"
    })
}

const postCommentByPostId = (req, res) => {
    res.status(200).send({
        "path" : "create comment by post id"
    })
}

module.exports = {
    postCommentByPostId,
    getCommentsByPostId
}