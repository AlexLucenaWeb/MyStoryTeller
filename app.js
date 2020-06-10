const fs = require('fs');
const express = require('express');

const app = express();

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


const port = 3000;
app.listen(port, () => {
    console.log(`App running on poty ${port}....`)
});