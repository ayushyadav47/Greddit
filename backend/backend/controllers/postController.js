const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const { response } = require('express')
const { findOne, findOneAndDelete } = require('../models/postModel')


const createPost = asyncHandler(async (req, res) => {
    const { text, postedBy, postedIn, upvotes, downvotes, comments } = req.body

    if (!text || !postedBy || !postedIn) {
        res.status(408)
        throw new Error('Please fill all fields')
    }

    const post = await Post.create({
        text,
        postedBy,
        postedIn,
        upvotes,
        downvotes,
        comments
    })

    if (post) {
        res.status(201).json({
            post
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Data')
    }
})

const showPost = asyncHandler(async (req, res) => {
    const { postedInGred } = req.body
    if (!postedInGred) {
        res.status(400)
        throw new Error("Invalid")
    }
    const posts = await Post.find({
        postedIn: postedInGred
    })
    if (posts) {
        res.status(201).json({
            posts
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Data')
    }


})

const upvotePost = asyncHandler(async (req, res) => {
    const { upvotedBy, _id } = req.body

    if (!upvotedBy || !_id) {
        res.status(400)
        throw new Error("Invalid")
    }

    const post1 = await Post.findOne({'_id':_id})
    const var12 = post1.upvotes.includes(upvotedBy)

    if(var12)
    {
        res.status(400)
        throw new Error("User already upvoted")
    }

    const ran = await Post.findOneAndUpdate({ '_id': _id }, { $pull: { "downvotes": upvotedBy } })
    const post = await Post.findOneAndUpdate({ '_id': _id }, { $push: { 'upvotes': upvotedBy } })
    if (post) {
        res.status(201).json({
            post
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Data')
    }
})

const downvotePost = asyncHandler(async (req, res) => {
    const { downvotedBy, _id } = req.body

    if (!downvotedBy || !_id) {
        res.status(400)
        throw new Error("Invalid")
    }
    const post1 = await Post.findOne({'_id':_id})
    const var12 = post1.downvotes.includes(downvotedBy)

    if(var12)
    {
        console.log('helo')
        res.status(400)
        throw new Error("User already downvoted")
    }

    const ran = await Post.findByIdAndUpdate({ '_id': _id }, { $pull: { "upvotes": downvotedBy } })
    const post = await Post.findOneAndUpdate({ '_id': _id }, { $push: { 'downvotes': downvotedBy } })
    if (post) {
        res.status(201).json({
            post
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid Data')
    }

})



module.exports = {
    createPost, showPost, upvotePost, downvotePost
}