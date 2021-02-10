const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')

const getAllPosts = (req, res, next) => {
    Posts
    .findAll({
      include: [
        { model: Users, attributes: ['name']},
        {model : Comments, attributes: ['content', 'createdAt']}
      ],
      attributes: ['content', 'description', 'createdAt', 'uuid', 'categoryId'] 
    })
    .then(posts => res.json(posts))
    .catch(next)
}

const getPostById = (req, res, next) => {
  console.log(req.params.postId)
    Posts
    .findOne({
      include: [
        {model: Users, attributes: ['name']},
        {model : Comments, attributes: ['content', 'createdAt']}
      ],
      attributes: ['content', 'description', 'createdAt', 'uuid', 'categoryId'] ,
      where: {uuid: req.params.postId},
      })
    .then(post => {
      if(post == null){
        res.status(404).send({
          success: false,
          message: 'Could not found this post.'
        })
      }else{
        res.status(200).json(post)
      }
    })
    .catch(next)
}

const createPost = (req, res, next) => {
    const {userUuid, categoryId, content, description} = req.body

    if (userUuid && content && categoryId && description) {
      console.info("Creating a post", req.body)
      Posts
        .create(req.body)
        .then(result => {
          res.status(201).send({"message": "Post created", "data": result} )
        })
        .catch(console.error);
    } else {
     if(content.length < 1){
      res.status(400).send({"message": "You can not create an empty post"});
     }
    }
}

module.exports = {
    createPost,
    getPostById,
    getAllPosts
}