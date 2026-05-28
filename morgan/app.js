const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(
    morgan('common')
);

app.use((req, res, next) => {
    console.log("this is first middleware");
    return next();
});

app.use((req, res, next) => {
    console.log("this is second middleware");
    return next();
});


app.get('/', (req, res) => {
    res.send("HIIII");
});

app.get('/cats', (req, res) => {
    res.send("MEow MEOW");
});


app.listen(3000, () => {
    console.log("LISTENING FROM PORRT 3000")
})