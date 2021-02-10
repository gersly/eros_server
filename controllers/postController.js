const Posts = require('../models/postModel')

const getAllPosts = (req, res, next) => {
    Posts
    // .findAll({
      // include: Users,
      // attributes: { exclude: ['password'] }
    //   attributes: ['content', 'userId', 'votes', 'createdAt', 'groupId', 'id'] ,
    //   include: Comment
    // })
    .findAll()
    .then(posts => res.json(posts))
    .catch(next)
}

const getPostById = (req, res, next) => {
    Posts
    .findOne({
    //  include: {
    //    model: Comment
    //  },
    //  attributes: { exclude: ['updatedAt'] } ,
      where: {uuid: req.params.postId},
      })
    .then(post => res.status(200).json(post))
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