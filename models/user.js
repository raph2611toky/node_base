const mongoose = require('mongoose');
const { hashPassword } = require('../utils/securite/bcrypt');

const userSchema = new mongoose.Schema({
    name:     { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sexe:     { type: String, enum: ['masculin', 'feminin'], required: true },
    contact:  { type: String, required: true },
    adresse:  { type: String, required: true },
    profile:  { type: String, default: 'default.png' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.profile = `${process.env.BASE_URL}/uploads/profiles/${user.profile}`;
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);
