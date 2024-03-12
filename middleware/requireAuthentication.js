const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuthentication = async (req, res, next) => {
    // verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        res.status(401).json({error: "Authorization required!"})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)

        req.user = await User.findOne({ _id}).select('_id')

        next()

    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Authorization failed!"})
    }


}

module.exports = requireAuthentication