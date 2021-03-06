'use strict';

const express = require('express');
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

router.get('/users', (req, res, next) => {
  knex('users')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
})


// router.post('/users', (req, res, next) => {
//
//   knex('users')
//     .then(user_info => {
//       const {first_name, last_name, email, hashed_password} = req.body;
//       console.log(req.body);
//       let newUser = {};
//       if (first_name) {
//         newUser.first_name = first_name;
//       }
//
//       if (last_name) {
//         newUser.last_name = last_name;
//       }
//
//       if (email) {
//         newUser.email = email;
//       }
//
//       if (hashed_password) {
//         newUser.hashed_password = hashed_password;
//       }
//
//       return knex('users')
//         .insert(newUser);
//
//     })
//     bcrypt.hash(req.body.hashed_password, 12)
//       .then(hashed_password => {
//         console.log(hashed_password);
//         res.sendStatus(200);
//       })
//       .catch(err => {
//         next(err);
//       })
//     .then(data => {
//       const user = data[0];
//       res.send(user);
//     })
//     .catch(err => {
//       next(err);
//     })
// })

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.hashed_password, 12)
    .then(hashed_password => {
      console.log(hashed_password);
      return knex('users')
        .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          hashed_password: hashed_password
        });
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
})

// router.post('/users', (req, res, next) => {
//   knex('users')
//     .insert(req.body)
//     .then(data => {
//       const user = data[0];
//       res.status(200).send(user);
//     })
//     .catch(err => {
//       next(err);
//     })
// })

router.delete('/users/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  let user;

  knex('users')
    .where('id', id)
    .first()
    .then(row => {
      user = row;
      return knex('users')
        .del()
        .where('id', id)
    })
    .then(function() {
      res.send(user);
    })
    .catch(err => {
      next(err);
    })
})


module.exports = router;
