const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')
const cryptoRandomString = require('crypto-random-string');

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

//Controllers
app.use("/api/v1", 
        userRouter,
        testRouter,
        authRouter,
        commentRouter
        )

db.sync({ force: true })
.then(async () => {
    console.info(`Database is connected`)
})
.catch(console.error)