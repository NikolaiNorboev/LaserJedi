const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('main')
})

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/decide', (req, res) => {
  res.render('decide');
})

router.get('/login', (req ,res) => {
  res.render('login')
})

module.exports = router;
