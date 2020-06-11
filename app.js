const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

// 1- Middleware functions


app.use((req, res, next) => {
    console.log('Hello from middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//reading JSON file from dev
const books = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2- Handler functions:
const getAllBooks =  (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
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


// 3- Routes:
app.route('/api/v1/books')
    .get(getAllBooks)
    .post(createBook);

app.route('/api/v1/books/:id')
    .get(getBook)
    .patch(updateBook)
    .delete(deleteBook);

// 4- Server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on poty ${port}....`)
});