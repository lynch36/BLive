/* AQUI SE AGREGA TODO EL LADO DEL CRUD */
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

/* ROUTER BOOKS */
router.get('/', isLoggedIn, async (req, res) => {
    const books = await pool.query('SELECT * FROM books WHERE user_id = ?', [req.user.id]);
    res.render('books/list', {books});
});

router.get('/add', isLoggedIn, (req, res) => {
    res.render('books/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const {title, img, autor, descripcion} = req.body;
    const newBook = {
        title,
        img,
        autor,
        descripcion,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO books set ?', [newBook]);
    req.flash('success', 'Book Saved Successfully');
    res.redirect('/books');
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
    res.render('books/edit', { book: books[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, img, descripcion, autor } = req.body;
    const newBook = {
        title,
        img,
        descripcion,
        autor
    };
    await pool.query('UPDATE books SET ? WHERE id = ?', [newBook, id]);
    req.flash('success', 'Book Updated Successfully');
    res.redirect('/books');
});

module.exports = router;