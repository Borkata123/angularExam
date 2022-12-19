const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    companyLogoUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    requirements: {
        type: String
    },
    salary: {
        type: String
    },
    applications: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;