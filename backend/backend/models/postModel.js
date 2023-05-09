const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    text: {
        type: String,
        required: [true, 'Please add text'],
    },
    postedBy: {
        type: String,
        required: [true, 'Name of user who posted'],
    },
    postedIn: {
        type: String,
        required: [true, 'Posted in which SubGreddit'],
    },

    upvotes: {
        type: Array,
    },
    downvotes: {
        type: Array,
    },
    comments: [{
        commentedBy: {
        type: String
        },
        comment: {
            type: String
        }
    }]
    
},
{
    timestamps: true
}

)

module.exports = mongoose.model('Post', postSchema)