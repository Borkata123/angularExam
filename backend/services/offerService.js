const Offer = require('../models/Offer');

exports.getAll = () => Offer.find();

exports.create = (data) => Offer.create(data);

exports.edit = (offerId, data) => Offer.findByIdAndUpdate(offerId, data);

exports.delete = (offerId) => Offer.findByIdAndDelete(offerId);

exports.getOne = (offerId) => Offer.findById(offerId);

exports.apply = async(userId, offerId) => {
    const offer = await Offer.findById(offerId);

    offer.applications.push(userId);

    return offer.save();
};