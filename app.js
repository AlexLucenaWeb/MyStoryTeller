const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

//reading JSON file from dev
const books = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/books', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: books.length,
        data: {
            books
        }
    })
});

app.post('/api/v1/books', (req, res) => {
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
});


const port = 3000;
app.listen(port, () => {
    console.log(`App running on poty ${port}....`)
});