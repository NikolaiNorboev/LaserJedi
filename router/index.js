const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('main')
})

router.get('/decide', (req, res) => {
  res.render('decide');
})

module.exports = router;
