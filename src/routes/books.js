const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('books/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const {title, autor, descripcion} = req.body;
    const newBook = {
        title,
        autor,
        descripcion,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO books set ?', [newBook]);
    req.flash('success', 'Book Saved Successfully');
    res.redirect('/books');
});

router.get('/', isLoggedIn, async (req, res) => {
    const books = await pool.query('SELECT * FROM books WHERE user_id = ?', [req.user.id]);
    res.render('books/list.hbs', {books});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM books WHERE ID = ?', [id]);
    req.flash('success', 'Book Deleted Successfull');
    res.redirect('/books');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const books = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    console.log(books[0]);
    res.render('books/edit', { book: books[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, descripcion, autor } = req.body;
    const newBook = {
        title,
        descripcion,
        autor
    };
    await pool.query('UPDATE books SET ? WHERE id = ?', [newBook, id]);
    req.flash('success', 'Book Updated Successfully');
    res.redirect('/books');
});

module.exports = router;