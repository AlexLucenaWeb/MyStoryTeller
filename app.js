const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

//reading JSON file from dev
const books = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Handler functions:
const getAllBooks =  (req, res) => {
    res.status(200).json({
        status: 'success',
        result: books.length,
        data: {
            books
        }
    })
}

const getBook = (req, res) => {
    const id = req.params.id * 1;
    const book = books.find(el => el.id === id);
    
    if(!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
}

const createBook = (req, res) => {
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

const deleteBook = (req, res) => {
    const id = req.params.id * 1;
    const book = books.find(el => el.id === id);
    
    if(!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
}

const updateBook = (req, res) => {
    const id = req.params.id * 1;
    const book = books.find(el => el.id === id);
    
    if(!book) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour:'<Updated>' 
        }
    });
}


//Routes:
app.route('/api/v1/books')
    .get(getAllBooks)
    .post(createBook);

app.route('/api/v1/books/:id')
    .get(getBook)
    .patch(updateBook)
    .delete(deleteBook);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on poty ${port}....`)
});