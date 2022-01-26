const jwt = require('jsonwebtoken');
const config = require ('../config/auth/key');

module.exports = (req, res, next) => {
    //TODO: Midellware do wsadzenia w endpoint i sprawdzania czy jest adminem, możliwe że wystarczy to sprawdzic na frontencdzie
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token === 'null' || token === undefined){
        return res.sendStatus(401)
    }

    jwt.verify(token, config.secret, (err, user) =>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user;
    })
    next();
}