# loginMongodb Authentication
This module is for implementing Register, Login and Change Password function.

## Requirements
- Install nodeJS 14 [(Click here to download)](https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi "NodeJS Download")
- Install MongoDB [here](https://docs.mongodb.com/manual/administration/install-community/). ([Optional] You can instead use MongoDB Atlas if you want.)

### Installation
- Clone/download the project
- Open the project
- Install all the dependencies by running `npm install` in terminal.
- Add these environment variables to a .env file on your project root directory.
```
DB_URL=
```
```
PORT=
```
```
JWT_SECRET=
```
*DB_URL*: In DB_URL you can add mongodb Atlas connection string or you can add local mongodb URL. If you don't know how to generate MongoDB Atlas database URL then [follow](https://www.teachmebro.com/tutorial/building-a-todo-app-backend/todo-app-making-mongodb-database-connection/) this tutorial

*PORT*: Enter port number at which app will run

*JWT_SECRET*: Enter any long string consist of random characters.

Your final `.env ` should look like this:
```
DB_URL="mongodb://localhost:27017/login-app-db"
PORT=3000
JWT_SECRET=sejrhernmfnggbxbfasassqkwejwrjqfjb332#$#@gsf@@@qwn
```
Note: If you still having problem in creating environmental variable then create a `.env` file in root directory and paste the above code as it is. Make sure you have installed Mongodb on your System.

## How to run ?
Execute this command
```
npm start
```

If you are modifying or making any changes to this project, Use
```
npm run dev
```
It will start project using `nodemon` server. Each time when you make changes it will restart the server automatically

## Navigation
`http://localhost:3000` contain index page eg. *Registration Page*.

`http://localhost:3000/login.html` contains *Login Page*.

`http://localhost:3000/change-password.html` contains *Change Password* page

## TODO

- create User.
- Login User.
- Change Password
- Auth via JWT.
- Resetting password.

## How to Contribute
- Fork the repo
- Make Changes
- Pull Request

Note: Make sure to check Issue section for Identified Issues

## Built with
- Nodejs 14
- MongoDB
- Express
- JWT (JsonWebToken)
- bcrypt
- Mongoose
- BodyParser
- path
- dotenv

