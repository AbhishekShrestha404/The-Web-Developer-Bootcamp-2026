const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const session = require('express-session');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(
        'mongodb://admin:admin123@127.0.0.1:27017/AuthDemo?authSource=admin'
    );

    console.log('MONGO CONNECTION OPEN');
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    secret: 'notagoodsecret'
}));

app.use(express.urlencoded({ extended: true }));

// Middleware to require login
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }

    next();
};

// Home
app.get('/', (req, res) => {
    res.send('THIS IS HOME PAGE');
});

// Register page
app.get('/register', (req, res) => {
    res.render('register');
});

// Register user
app.post('/register', async (req, res) => {
    const { password, username } = req.body;

    const user = new User({
        username,
        password
    });

    await user.save();

    req.session.user_id = user._id;

    res.redirect('/login');
});

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Login user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await User.findAndValidate(username, password);

    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
});

// Logout
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
});

// Secret page
app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
});

// Top secret page
app.get('/topsecret', requireLogin, (req, res) => {
    res.send('This is top secret not just secret');
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
