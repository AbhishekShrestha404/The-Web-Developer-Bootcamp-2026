const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const { mongoUri } = require('../dbConfig');

main().catch(err => {
    console.error(err);
    process.exitCode = 1;
});

async function main() {
    await mongoose.connect(mongoUri);

    console.log("MONGO CONNECTION OPEN");
    try {
        await seedDB();
    } finally {
        await mongoose.connection.close();
    }
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '6aa13a0a34ccf758f5d4bc0c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum dolore voluptatem nam adipisci, numquam, voluptate excepturi incidunt quod pariatur quibusdam quaerat? Quam, consectetur exercitationem voluptate itaque aliquid totam a maiores.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [85.42616743594408, 27.671113556965704]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/joxyhod8/image/upload/v1789979035/Yelpcamp/zlbizcwwivffbuksqblb.png',
                    filename: 'Yelpcamp/zlbizcwwivffbuksqblb',
                }
            ]
        })
        await camp.save();
    }
}

