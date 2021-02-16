const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: String,
    email: String,
    phone: Number,
    password: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;