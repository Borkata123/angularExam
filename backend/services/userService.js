const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const secret = '4356hju7debgnyi';
const saltRounds = 10;

const jwtSign = promisify(jwt.sign);

exports.getAll = () => User.find();

exports.getOne = (userId) => User.findById(userId);

exports.register = async ({ email, password }) => {
    let hashedPassword;

    if (password.length >= 8) {
        hashedPassword = await bcrypt.hash(password, saltRounds);
    } else {
        throw { message: 'Password should be at least 8 characters.' };
    }

    let createdUser = await User.create({
        email,
        password: hashedPassword
    });

    let token = await jwtSign({ _id: createdUser._id, email: createdUser.email }, secret, { expiresIn: '3d' });

    return { token, createdUser };
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw { message: 'Cannot find email or password' };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw { message: 'Cannot find email or password' };
    }

    let token = await jwtSign({ _id: user._id, email: user.email }, secret, { expiresIn: '3d' });

    return { token, user };
}