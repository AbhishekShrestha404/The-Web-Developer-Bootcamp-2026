module.exports = {
    mongoUri: process.env.MONGODB_URI ||
        'mongodb://admin:admin123@127.0.0.1:27017/yelp-camp?authSource=admin'
};
