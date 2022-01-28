const jwt = require('jsonwebtoken');
const config = require ('../config/auth/key');
const authUtil = require('../util/authUtils');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token === 'null' || token === undefined){
        console.log("isAuth Error HEADERS:", req.headers)
        return res.sendStatus(401)
    }
   jwt.verify(token, config.secret, (err, user) =>{
        if(err){
            return res.sendStatus(403)//.message('You need to be Authenticated')
        }
        req.user = user;
    })
    console.log("IsAuth Succes, data: ",req.user)
    next();
}