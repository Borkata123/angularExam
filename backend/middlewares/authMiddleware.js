const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const secret = '4356hju7debgnyi';

const jwtVerify = promisify(jwt.verify);

exports.auth = async(req, res, next) => {
    let token = req.headers['authorization'];
    if(token){
        try{
            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;
        }catch(err){
            console.log(err);
            return res.redirect('/404');
        }
    }

    next();
};

exports.isAuth = (req, res, next) => {
    const user = req.headers['authorization'];

    if(!user){
        return res.redirect('/404');
    }

    next();
};