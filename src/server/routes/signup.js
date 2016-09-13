const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcryptjs');


router.get('/', (req, res, next) => {
  res.render('signup.html');
});

router.post('/', (req, res, next) => {
  var hash = bcrypt.hashSync(req.body.password, 8);
  var username = req.body.username;
  db.any(`INSERT INTO users (username, password) VALUES('${username}', '${hash}')`)
    .then((results) => {
      if (results.length) {
        const renderObject = {};
        renderObject.success = 'success';
        res.render('index.html', renderObject);
      } else {
        res.status(404).send({
          status: 'error',
          message: 'fail'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
