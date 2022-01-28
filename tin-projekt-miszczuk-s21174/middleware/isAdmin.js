
module.exports = (req, res, next) => {
    if (req.user && req.user.role !== 'Admin') {
        return res.sendStatus(403)
    }
    next();
}