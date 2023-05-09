const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {

    let token
    try {
        token = req.body.email

        //get user from token
        req.user = await User.findOne({email:token}).select('-password')
        next()
    }
    catch (error) {
        console.log('error')
        res.status(401)
        throw new Error('Not Authorized')
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }


})

module.exports = { protect }