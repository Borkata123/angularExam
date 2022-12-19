const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');

const { auth } = require('./middlewares/authMiddleware');

const app = express();

const dbUrl = 'mongodb://127.0.0.1:27017/clearCareer';

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(auth);
app.use(routes);

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl)
    .then(() => {
        app.listen(3030, () => console.log('App is listening to port 3030...'));
    })
    .catch((error) => {
        return error;
    });