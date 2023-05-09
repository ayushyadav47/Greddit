const asyncHandler = require('express-async-handler')
const Subgred = require('../models/subgredModel')
const { response } = require('express')

const registerSubgred = asyncHandler(async (req, res) => {

    const { name ,description, tags, banned, email, followers } = req.body

    // console.log(subgred)
    if (!name || !description  ) {
        res.status(400)
        throw new Error('Invalid')
    }

    //create subgred
    const subgred = await Subgred.create({
        name,
        email,
        description,
        tags,
        banned,
        followers,
    })
    if (subgred) {

        res.status(201).json({
            subgred
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Data')
    }
})

const showSubgred = asyncHandler(async (req, res) => {

    const { _id} = req.body

    if(!_id)
    {
        res.status(400)
        throw new Error("Invalid Data")
    }

    const subgred = await Subgred.findById({_id})
    if(subgred)
    {
        res.status(201).json({
            subgred
        })
    }
})

const showallSubgred = asyncHandler(async(req,res) => {
    const subgred = await Subgred.find()
    if(subgred)
    {
        res.status(201).json({
            subgred
        })
    }
})

const showMysubgred = asyncHandler(async(req,res) => {
    const {user} = req.body

    const subgred = await Subgred.find({'email':user})
    console.log(subgred)
    if(subgred)
    {
        res.status(201).json({
            subgred
        })
    }
})

module.exports = {
    registerSubgred,
    showSubgred,
    showallSubgred,
    showMysubgred
}