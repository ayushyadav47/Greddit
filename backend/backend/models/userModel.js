const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Please enter your age'],
    },

    username: {
        type: String,
        required: [true, 'Please enter your Contact Number'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    
},
{
    timestamps: true
}

)

module.exports = mongoose.model('User', userSchema)