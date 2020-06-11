const fs = require('fs');

//reading JSON file from dev
const books = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checKID = (req, res, next, val) =>{
    console.log(`Book id is ${val}`);

    if(req.params.id * 1 > books.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
}

exports.checkBody = (req, res, next) =>{
    //cambiar price por otro parametro:
    if (!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid formated body'
        })
    }
    next();
}

exports.getAllBooks =  (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: books.length,
        data: {
            books
        }
    })
}
exports.getBook = (req, res) => {

    const id = req.params.id * 1;
    const book = books.find(el => el.id === id)
    
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
}
exports.createBook = (req, res) => {
    const newId = books[books.length - 1].id +1;
    const newBook = Object.assign({id: newId}, req.body);

    books.push(newBook);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(books), err => {
        res.status(201).json({
            status: 'success',
            data: {
                book: newBook
            }
        });
    }); 
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
