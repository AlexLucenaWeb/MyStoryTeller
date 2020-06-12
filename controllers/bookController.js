const Book = require('./../model/bookModel');

exports.getAllBooks = async (req, res) => {
    try{
        const books = await Book.find()
    
        res.status(200).json({
            status: 'success',
            result: books.length,
            data: {
                books
            }
        });
    } catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }  
}
exports.getBook = async (req, res) => {

    try{
        const book = await Book.findById(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: {
            book
            }
        })

    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
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
