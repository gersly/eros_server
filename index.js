const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')

//Configure server port
const app = express();
const port = process.env.PORT || 5050;
app.listen(port, () => console.info(`App server up and running locally on port ${port}`));

// Middleware
const cors = require('cors');
const corsMiddleware = cors();
const bodyParser = require('body-parser').json();
app.use(corsMiddleware, bodyParser);

// Database
const db = require('./db');

//Router
const userRouter = require('./routes/userRouter')
const testRouter = require('./routes/testRouter')
const authRouter = require('./routes/authRouter')
const commentRouter = require('./routes/commentRouter')
const postRouter = require('./routes/postRouter')

//Models
const Users = require('./models/userModel')
const Posts = require('./models/postModel')
const Comments = require('./models/commentModel')

//Controllers
app.use("/api/v1", 
        userRouter,
        testRouter,
        authRouter,
        commentRouter,
        postRouter
        )

db.sync({ force: true })
.then(async () => {
    console.info(`Database is connected`)
    await Users.create({
        uuid: 'fa6d83bc-7376-4e4c-a9c3-d961997a5e65',
        email: 'gerson@gerson.com',
        password: bcrypt.hashSync('gerson123', 10),
        name: 'Gerson Lynch'
    }),
    await Users.create({
        uuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        email: 'john@doe.com',
        password: bcrypt.hashSync('john123', 10),
        name: 'John Doe'
    }),
    await Posts.create({
        userUuid: 'fa6d83bc-7376-4e4c-a9c3-d961997a5e65',
        content: 'What is an STI?',
        description: 'I read that an sti is something Proident enim veniam enim pariatur. Dolor voluptate exercitation qui nulla amet ex labore deserunt in tempor nulla officia ullamco eiusmod. Dolor duis esse dolore laboris eu ullamco elit quis reprehenderit labore consectetur laborum cillum. Adipisicing ipsum nostrud consequat in Lorem quis exercitation excepteur ullamco eiusmod. Ipsum aliquip consequat commodo duis. Quis commodo velit exercitation excepteur do cillum labore. Laborum dolor exercitation cillum laboris proident excepteur deserunt commodo aute nostrud minim officia.',
        categoryId: 1
    }),
    await Posts.create({
        userUuid: 'fa6d83bc-7376-4e4c-a9c3-d961997a5e65',
        uuid: '167cfab3-aba1-495a-be5d-7fe6b9430da9',
        content: 'How old do I need to be to have sex?',
        description: 'I read that an sti is something Proident enim veniam enim pariatur. Dolor voluptate exercitation qui nulla amet ex labore deserunt in tempor nulla officia ullamco eiusmod. Dolor duis esse dolore laboris eu ullamco nostrud minim officia.',
        categoryId: 2
    }),
    await Posts.create({
        userUuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        content: 'How can people be polyamorous?',
        description: 'Fugiat sunt dolore proident eiusmod quis deserunt minim.',
        categoryId: 1
    }),
    await Comments.create({
        userUuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        postUuid: '167cfab3-aba1-495a-be5d-7fe6b9430da9',
        content: 'How ever old you want to be? Just be careful'
    })
})
.catch(console.error)