module.exports = (req, res, next) => {
    const { name, email, password, sexe, contact, adresse } = req.body;

    if (!name || !email || !password || !sexe || !contact || !adresse) {
        return res.status(400).json({ erreur: 'Tous les champs sont requis' });
    }
    if (!['masculin', 'feminin'].includes(sexe)) {
        return res.status(400).json({ erreur: 'Sexe invalide' });
    }
    next();
};
