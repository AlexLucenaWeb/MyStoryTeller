const Book = require('./../model/bookModel');

exports.getAllBooks =  (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        //result: books.length,
        //data: {
        //    books
        //}
    })
}
exports.getBook = (req, res) => {

    const id = req.params.id * 1;
    //const book = books.find(el => el.id === id)
    //
    //res.status(200).json({
    //    status: 'success',
    //    data: {
    //        book
    //    }
    //})
}
exports.createBook = async (req, res) => {
    try{
        const newBook = await Book.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                book: newBook
            }
        });
    } catch (err) {
        res.status(400).json({ 
            status: 'fail',
            message: err
        })
    }
}

exports.deleteBook = (req, res) => {   
    res.status(204).json({
        status: 'success',
        data: null
    });
}
exports.updateBook = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            book:'<Updated>' 
        }
    });
}
