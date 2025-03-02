const mongoose = require('mongoose');
const { hashPassword } = require('../utils/securite/bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sexe: { type: String, enum: ['masculin', 'feminin'], required: true },
    contact: { type: String, required: true },
    adresse: { type: String, required: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
