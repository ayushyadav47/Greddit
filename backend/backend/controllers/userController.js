const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { response } = require('express')

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, age, username, password } = req.body

    // console.log(User)
    if (!name || !email || !password || !age || !username) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const userExists = await User.findOne({ email }) // check for already existing users

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        age,
        username,
        password: hashedPassword

    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            username: user.username,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user Data')
    }
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {

        // console.log(generateToken(user.id))
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    
    const {_id, name,age,username, email} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name,
        email,
        age,
        username
    })
})

const editUser = asyncHandler(async (req, res) => {

    const { email, name, username, age } = req.body

    const user = await User.findOneAndUpdate({ 'email': email.email }, {'username': username,'name':name,'age':Number(age)},{new: true}).lean().exec()

    res.json(user)
})

//generate jwt
const generateToken =  (id) => {
    const tok =  jwt.sign({ id }, 'abc123', {
        expiresIn: '30d',
    }
    )
    return tok;
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    editUser,
}
