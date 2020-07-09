const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// -- Render routes  --
router.get('/', (req, res) => {
    res.status(200).render('base', {
        book: 'Los ratones y la lluvia',
        user: 'Alex'
    });
});

router.get('/allbooks', viewController.allBooksPage);
router.get('/book/:slug', viewController.bookPage);


module.exports = router;