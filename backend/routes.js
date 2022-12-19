const router = require('express').Router();

const userController = require('./controllers/userController');
const offerController = require('./controllers/offerController');

const { isAuth } = require('./middlewares/authMiddleware');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.get('/offers', offerController.getOffers);
router.get('/offers/:id', offerController.getOneOffer);
router.get('/offers/apply/:userId/:offerId', isAuth, offerController.apply);

router.post('/users/register', userController.registerUser);
router.post('/users/login', userController.loginUser);
router.post('/offers/create', isAuth, offerController.createOffer);

router.put('/offers/edit/:id', isAuth, offerController.editOffer);
router.delete('/offers/delete/:id', isAuth, offerController.deleteOffer);

module.exports = router;