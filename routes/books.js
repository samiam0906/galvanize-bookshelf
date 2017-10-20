'use strict';

const express = require('express');
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

// READ ALL
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

// READ ONE
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

// CREATE
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

// UPDATE
router.patch('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.send(req.params.id + " IS NOT A NUMBER");
  }

  knex('books')
    .where('id', id)
    .first() // Pulls out the first record in array of id
    .then(book => {
      const {title, author, genre, description, cover_url} = req.body;

      const updateBook = {};

      if (title) {
        updateBook.title = title;
      }

      if (author) {
        updateBook.author = author;
      }

      if (genre) {
        updateBook.genre = genre;
      }

      if (description) {
        updateBook.description = description;
      }

      if (cover_url) {
        updateBook.cover_url = cover_url;
      }

      return knex('books')
        .update(updateBook)
        .where('id', id);
    })
    .then(rows => {
      const book = rows[0];
      res.send(book);
    })
    .catch(err => {
      next(err);
    })
})

router.delete('/books/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  let book;

  knex('books')
    .where('id', id)
    .first()
    .then(row => {
      book = row
      return knex('books')
        .del()
        .where('id', id);
    })
    .then(function() {
      res.send(book);
    })


})


module.exports = router;
