const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

// -- Render routes  --
router.get('/', (req, res) => {
    res.status(200).render('main', {
        book: 'Los ratones y la lluvia',
        user: 'Alex'
    });
});

router.get('/allbooks', viewController.allBooksPage);

router.get('/book', viewController.bookPage);


module.exports = router;