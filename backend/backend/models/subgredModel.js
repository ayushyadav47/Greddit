const mongoose = require('mongoose')


const subgredSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: {
        type: Array,
    },
    banned: {
        type: Array,
    },    
    followers: {
        type: Array,
    },
},
{
    timestamps: true
}

)

module.exports = mongoose.model('Subgred', subgredSchema)