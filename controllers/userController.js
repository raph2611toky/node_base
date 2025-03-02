const { comparePassword } = require('../utils/securite/bcrypt');
const jwt = require('../utils/securite/jwt');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'Utilisateur créé', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const userIsValid = await comparePassword(password, user.password);
        if (!userIsValid) return res.status(401).json({ message: 'Login ou mot de passe incorrect' });

        const token = jwt.generateToken({ id: user._id });
        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
