const Comments = require('../models/commentModel')
const Posts = require('../models/postModel')

const getCommentsByPostId = (req, res, next) => {
    const {postId} = req.params
      let data = {count: 0, rows:[]}
    Comments
    .findAndCountAll({
        where:{
            postUuid: postId
        },
        attributes: { exclude: ['userUuid', 'updatedAt', 'postUuid'] },
    })
    .then(comments => {
      comments.rows.map(comment => 
        data.rows.push(comment.dataValues)
        )
        json = {
          count: comments.count,
          rows: data.rows
        }
        res.status(201).send(json)
       } )
    .catch(next)
}

const postCommentByPostId = (req, res, next) => {
    const {userId, postId, content} = req.body
    if (userId && content && postId) {
      Comments
        .create({
          userUuid: userId,
          postUuid: postId,
          content
        })
        .then(result => {
          const {content, createdAt, uuid} = result
          res.status(201).send({
            "message": "Comment posted", 
            "success": true, 
            "data": { 
                    content, 
                    createdAt, 
                    uuid
            }} )
        })
        .catch(console.error);
    } else {
     if(content.length < 1){
      res.status(400).send({"message": "You can not create an empty comment"});
     }
    }
}

module.exports = {
    postCommentByPostId,
    getCommentsByPostId
}