const Book = require('./../model/bookModel');

exports.getAllBooks = async (req, res) => {
    try{
        //BUILD THE QUERY
        // Creating an new object with the query params.
        const queryObj = {...req.query}
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        // Excluding fields to ignore them in the queryObj
        excludeFields.forEach(el => delete queryObj[el])

        console.log(req.query, queryObj);

        const query = await Book.find(queryObj);

        //EXECUTE THE QUERY:
        const books = await query;

        //SEND THE QUERY:
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

exports.updateBook = async (req, res) => {  
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                book
            }   
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }  
}
exports.deleteBook = async (req, res) => {
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null  
        });
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }  
}