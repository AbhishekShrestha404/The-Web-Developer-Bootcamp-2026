const mongoose = require('mongoose');
const Product = require('../models/product');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(
        'mongodb://admin:admin123@127.0.0.1:27017/farmStand?authSource=admin'
    );
    console.log("MONGO CONNECTION OPEN")
}

const seedProduct = [
    {
        name: 'Apple',
        price: 300,
        category: 'fruit'
    },
    {
        name: 'Potato',
        price: 150,
        category: 'vegetable'
    },
    {
        name: 'Watermelon',
        price: 300,
        category: 'fruit'
    },
    {
        name: 'Milk',
        price: 250,
        category: 'dairy'
    }
]

Product.insertMany(seedProduct)
    .then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e)
            ;
    })