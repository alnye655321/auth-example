const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcryptjs');


router.get('/', (req, res, next) => {
  res.render('signin.html');
});


router.post('/', (req, res, next) => {
  db.any(`SELECT * FROM users where username = $1`, req.body.username)
    .then((results) => {
      console.log(results[0].username);
      if (results[0].username) {
        var hash = bcrypt.hashSync(req.body.password, 8);
        console.log(results[0].username);
        if (bcrypt.compareSync(results[0].password, hash)) {
          //req.session.user = user;
          console.log('success');
          res.redirect('/signup');
          //res.send('success');
        }
      } else {
        //res.render('index.html');
        console.log('error');
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
