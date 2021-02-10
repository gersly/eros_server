## Eros - Sex_Ed Forum Server

## Basic Overview
NodeJs app running Express

### Tech Stack
- [NodeJS](https://nodejs.org/en/docs/) 
- [ExpressJS](https://expressjs.com/)
- [SequelizeJS](https://sequelize.org/master/identifiers.html)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Docker](https://docs.docker.com/)
- [Jsonwebtoken](https://jwt.io/introduction/)
- [Bcrypt](https://codahale.com/how-to-safely-store-a-password/)

## Installation
1. Clone this repo
```bash
git@github.com:gersly/eros_server.git [your_folder_name]
```

2. Install docker & nodejs globally then run

```bash
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=[secret] postgres
```

3. Go into the folder and install the dependancies
```bash
cd [your_folder_name] && npm install
```
4. Run the node app
```bash
 node index.js 
```
4. Alternative with Live/Hot Reload
```bash
nodemon index.js
```
## User Stories
- As a user, I want see all questions that have been asked
- As a user, I want to create a post(question)
- As a user, I want to be able to see all the comments for that question
- As a user, I want to be ble to create a comment on a post/answer a question

To Do:
- As a user, I want to create an account/login
- As a user, I want to receive notifications if someone answered my question
- As a user, I want to be able to delete my question
- As a user, I want to delete my account if needed

## Models

- [User](./models/userModel.js)
- [Post](./models/postModel.js)
- [Comment](./models/commentModel.js)

## Endpoints
Example
```bash
[domain or localhost]/api/v1/users
```

- [Users](./routes/userRouter.js)
- [Login](./routes/authRouter.js)
- [Post](./routes/postRouter.js)
- [Comment](./routes/commentsRouter.js)
- [User](./routes/userRouter)

Example request to the endpoint to fetch a specific post by postId
```bash
http https://5bc48dc6bf75.ngrok.io/api/v1/posts/167cfab3-aba1-495a-be5d-7fe6b9430da9
```

Example response
```bash
{
    "categoryId": 2,
    "comments": [
        {
            "content": "How ever old you want to be? Just be careful",
            "createdAt": "2021-02-10T14:32:18.654Z"
        }
    ],
    "content": "How old do I need to be to have sex?",
    "createdAt": "2021-02-10T14:32:18.645Z",
    "description": "I read that an sti is something Proident enim veniam enim pariatur. Dolor voluptate exercitation qui nulla amet ex labore deserunt in tempor nulla officia ullamco eiusmod. Dolor duis esse dolore laboris eu ullamco nostrud minim officia.",
    "user": {
        "name": "Gerson Lynch"
    },
    "uuid": "167cfab3-aba1-495a-be5d-7fe6b9430da9"
}
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)