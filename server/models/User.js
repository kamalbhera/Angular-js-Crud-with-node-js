const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    post: {
        type: String
    },
    password: {
        type: String
    }
},
{
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);