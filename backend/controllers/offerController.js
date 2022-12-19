const offerService = require('../services/offerService');

const jwt = require('jsonwebtoken');

const { promisify } = require('util');

const jwtVerify = promisify(jwt.verify);

const secret = '4356hju7debgnyi';

exports.getOffers = async (req, res) => {
    try {
        const offers = await offerService.getAll();
        res.status(200).json(offers);
    } catch (error) {
        res.status(404);
        res.send(error);
    }
};

exports.createOffer = async (req, res) => {
    const data = req.body;

    const token = await jwtVerify(req.headers['authorization'], secret);


    data.owner = token._id;

    try {
        let createdOffer = await offerService.create(data);
        res.status(200).json(createdOffer)
        res.end();
    } catch (error) {
        res.status(400);
        res.end();
    }
};

exports.editOffer = async (req, res) => {
    const data = req.body;
    const offerId = req.params.id;

    console.log(data);

    try {
        const editedOffer = await offerService.edit(offerId, data);
        res.status(200).json(editedOffer);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};

exports.deleteOffer = async (req, res) => {
    const offerId = req.params.id;

    try {
        const deletedOffer = await offerService.delete(offerId);
        res.status(200).json(deletedOffer);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};

exports.getOneOffer = async (req, res) => {
    const offerId = req.params.id;

    try {
        const offer = await offerService.getOne(offerId);
        res.status(200).json(offer);
    } catch (error) {
        res.status(404);
        res.send(error);
    }
};

exports.apply = async (req, res) => {
    const userId = req.params.userId;
    const offerId = req.params.offerId;

    try {
        const apply = await offerService.apply(userId, offerId);
        res.status(200).json(apply)
    } catch (error) {
        res.status(400);
        res.send(error);
    }
};