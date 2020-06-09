const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res
    .status(200)
    .json({
        message: 'Hello from the server side!',
        app: 'My Story Teller'
    });
});

app.post('/', (req, res) => {
    res
    .status(200)
    .json({
        message: 'posting...'
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on poty ${port}....`)
});