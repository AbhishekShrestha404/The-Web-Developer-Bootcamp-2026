const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const { geocoding, config } = require('@maptiler/client');
config.apiKey = process.env.MAPTILER_TOKEN;

const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res) => {
    const location = req.body.campground.location.trim();
    if (!location) {
        throw new ExpressError('Campground location cannot be empty.', 400);
    }

    const geoData = await geocoding.forward(location, {
        limit: 1
    });

    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.features[0].geometry;

    campground.images = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))

    campground.author = req.user._id;
    await campground.save();

    console.log(campground);

    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground cannot be found.');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('succes', 'You do not have access to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const location = req.body.campground.location.trim();

    const geoData = await geocoding.forward(location, {
        limit: 1
    });
    const campground = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
        geometry: {
            type: geoData.features[0].geometry.type,
            coordinates: geoData.features[0].geometry.coordinates
        }
    });
    const imgs = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}
