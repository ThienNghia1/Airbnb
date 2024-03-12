const mongoose = require('mongoose ');

const placeSchema = mongoose.model({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    descriptions: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
})

const PlaceModel = mongoose.model('Place', placeSchema);
model.exports = PlaceModel;