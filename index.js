const express = require('express');
const userRouter = require('./src/routes/user.router');
const app = express();

app.use('/user', userRouter);

//Rota
//htpp (get, post, put, path, delete)
//nome
//Function (callback)

app.listen(3000);