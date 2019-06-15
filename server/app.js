const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-commerce-react', { useNewUrlParser: true }); 
// mongoose.connect('mongodb://localhost/e-commers-test', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/e-commerc', { useNewUrlParser: true });
// mongoose.connect(`mongodb+srv://mahdihrs:${process.env.PASS_ATLAS}@projects-a1wq0.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
