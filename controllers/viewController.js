exports.allBooksPage = (req, res) => {
    res.status(200).render('allbooks', {
        title: 'All books'
    });
}

exports.bookPage = (req, res) => {
    res.status(200).render('book', {
        title: 'book name'
    });
}