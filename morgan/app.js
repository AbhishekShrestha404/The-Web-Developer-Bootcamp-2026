const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError')

// app.use(
//     morgan('common')
// );

// app.use((req, res, next) => {
//     console.log("this is first middleware");
//     return next();
// });

// app.use((req, res, next) => {
//     console.log("this is second middleware");
//     return next();
// });
app.use('/cats', (req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})


app.get('/', (req, res) => {
    res.send("HIIII");
});

app.get('/cats', (req, res) => {
    console.log(`Request Date:${req.requestTime}`);
    res.send("MEow MEOW");
});


const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'biralo') {
        return next();
    }
    throw new AppError('You need password to access this content!', 401);
    // return res.send("You need password to access this content!");
}

app.get('/secret', verifyPassword, (req, res) => {
    res.send("Meow meow biralo Yeta tira aau Mero Nana Katidine Musa Mari Khau Karayi ko Bubu Na Khau Ma bhokai Hunchu Dhuru Dhuru Runchu Lathhi Le Hanchu Chor Biralo Bhanchu");
})

app.use((req, res) => {
    res.status(404).send("NOT FOUND !")
});

app.use((err, req, res, next) => {
    const { status = 500, messsage = 'SOMETHING WENT WRONG!' } = err;
    res.status(status).send(messsage);
})

app.listen(3000, () => {
    console.log("LISTENING FROM PORRT 3000")
})