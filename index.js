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
        email: 'john@doe.com',
        password: bcrypt.hashSync('john123', 10),
        name: 'John Doe'
    }),
    await Users.create({
        uuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        email: 'jane@doe.com',
        password: bcrypt.hashSync('jane123', 10),
        name: 'Jane Doe'
    }),
    await Posts.create({
        uuid: '89e566a3-7f27-49a9-953d-a0887ab77e1f',
        userUuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        content: 'Why does it repulse me when my partner is sweet to me in the bedroom?',
        description: 'Is there something wrong with me? Like when someone I’m having sex with is nice or kind or gental I either cry or shut down. I have this horrible feeling of disgust and anger and hatred but NOT directed at them at all. It’s very internal. I have no idea why. I can only enjoy sex if I’m being treated horribly. Which I thought was just what I was into but the way sex makes me feel I don’t think is healthy I have no past of sexual abuse in my childhood. Just have had many many partners, often put myself in unsafe situations. I am a 21 year old female',
        categoryId: 1
    }),
    await Posts.create({
        userUuid: 'fa6d83bc-7376-4e4c-a9c3-d961997a5e65',
        uuid: '167cfab3-aba1-495a-be5d-7fe6b9430da9',
        content: 'Unprotected Sex, Partner Lied About History',
        description: 'I recently had unprotected sex with a partner who lied about their history. They got tested so we could have sec without a condom (I have an iud) but between those two events they had unprotected sex with somebody else several times who has not tested for their last four partners. Is there a term for this? I consented to the unprotected sex under the impression that they were clean and weren’t having sex with anyone else. I’m getting tested tomorrow but I feel disgusting',
        categoryId: 2
    }),
    await Posts.create({
        uuid: '10f21249-725e-4c4c-95b9-d4b5c974aab9',
        userUuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        content: 'Helppp, I cant get wettt?',
        description: 'So me and my boyfriend have been together for 4 years now. We get along great, live together, and only have normal issues that come up in a relationship. But I can’t get wet when we go to do the deed. No matter how much foreplay or what he does. I don’t stay dry throughout the day but as soon as we go to have sex I’m dry down there. The sex is amazing and always brings me to completion. I don’t understand why this is happening. It makes him feel bad because he thinks I’m not attracted to him anymore. I’ve been to the dr for it and all they tell me is that I need to not have sex for a few weeks. We go a month or two without it sometimes and it still doesn’t help. Does this only happen to me? Is this normal?',
        categoryId: 1
    }),
    await Comments.create({
        userUuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        postUuid: '167cfab3-aba1-495a-be5d-7fe6b9430da9',
        content: `Coercion is the term for what they did and you are definitely right to feel disgusted. That’s a huge violation of boundaries and safety, and the circumstances under which you consented weren’t the actual circumstances, you didn’t consent to what actually happened. I’m so sorry this happened to you, I’m glad you’re getting tested.`
    }),
    await Comments.create({
        userUuid: 'f7d2c5c2-2052-4832-a127-78cab5f9f676',
        postUuid: '10f21249-725e-4c4c-95b9-d4b5c974aab9',
        content: 'This happens, it is normal, I’m not sure what kind of doctor told you to not have sex cause that makes no sense. Are you on birth control? Sometimes different types of BC have different effects on your body. Try using water based lubrication when your feeling dry and talk to your BF and let him know that your body is just not complying with how you feel, it has nothing to do with him and this type of thing happens sometimes.'
    }),
    await Comments.create({
        postUuid: '89e566a3-7f27-49a9-953d-a0887ab77e1f',
        userUuid: 'fa6d83bc-7376-4e4c-a9c3-d961997a5e65',
        content: 'Is it possible you have been exposed to violent or degrading porn during your sexually formative years and now you have created a Pavlovian link between sex and bad treatment. Anyway, you should see a proffesional, that will help you understand better.'
    })
})
.catch(console.error)