'use strict';

const express = require('express');
const knex = require('../knex')
// const humps = require(`humps`);

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

router.get('/books', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
})

router.get('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.send(req.params.id + " IS NOT A NUMBER");
  }

  knex('books')
    // looking up where id = req.params.id
    .where('id', req.params.id)
    .first()
    .then(data => {
      if (!data) {
        res.status(404).send('Bad Request');
      }
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
})

router.post('/books', (req, res, next) => {
  knex('books')
    .insert(req.body)
    .then((data) => {
      const book = data[0];
      res.status(200).send(book);
    })
    .catch(err => {
      next(err);
    });
})

router.patch('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.send(req.params.id + " IS NOT A NUMBER");
  }

  knex('books')
    .where('id', req.params.id)
    .update({title: "UPDATED TITLE"})
    .then(data => {
      res.sendStatus(200).send(data);
      // const book = data[id];
      // res.send(book);
    })
    .catch(err => {
      next(err);
    })
})



module.exports = router;
