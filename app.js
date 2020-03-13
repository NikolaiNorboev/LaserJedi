const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const app = express();

const session = require("express-session"); // для работы сессии
// const FileStore = require("session-file-store")(session); // объект для сессии
const { cookiesCleaner } = require("./midleware/auth"); // для cookies хз зачем

const userRouter = require('./router/user');
const indexRouter = require('./router/index');
const decideRouter = require('./router/decide');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/" , indexRouter);
app.use('/' , decideRouter);
app.use('/user' , userRouter);


// app.use(
//   session({
//     store: new FileStore(),
//     key: "user_sid",
//     secret: "anything here",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 600000
//     }
//   })
// );


app.listen(3000, () => console.log('PORT 3000'));
