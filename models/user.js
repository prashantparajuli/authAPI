const mongoose = require('mongoose');
const { Role } = require('./role');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
    role: {
        type: String,
        required: true,
        default: Role.basic,
        enum: ['basic', 'admin'],
    },
})

exports.Users = mongoose.model('Users', usersSchema);