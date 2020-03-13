const express = require("express");
const path = require("path");
const app = express();

const indexRouter = require('./router/index');
const decideRouter = require('./router/decide');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/" , indexRouter);
app.use('/' , decideRouter);


const port = process.env.PORT || 3000

app.listen(port, () => console.log('PORT '+port));
