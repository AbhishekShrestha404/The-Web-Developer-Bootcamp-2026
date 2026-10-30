module.exports = {
    mongoUri: process.env.DB_URL ||
        'mongodb://admin:admin123@127.0.0.1:27017/yelp-camp?authSource=admin'
};
