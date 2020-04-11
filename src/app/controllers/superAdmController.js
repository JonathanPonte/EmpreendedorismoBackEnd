const express = require('express');
const authmiddleware = require('../middlewares/authSuperAdm');
const bcrypt = require('bcryptjs');

const Adm = require('../models/Adm');
const User = require('../models/User');
const type = require('../util/util.json');

const router = express.Router();

async function cryptoPassword(password) {
    const hash = await bcrypt.hash(password, 10);

    return hash
}

router.use(authmiddleware);

//criar novo superAdm
router.post('/', async (req, res) => {
    const { name, user } = req.body;
    var { email, password } = user;

    try {
        if (await User.findOne({ email }))
            return res.status(403).send({ error: 'User Already exists' });

        const adm = await Adm.create({ name });
        password = await cryptoPassword(password);
        const user = await User.create({ email, password });
        await user.save();

        adm.user = user;
        adm.type = type.SuperAdm;

        await adm.save();

        return res.status(201).send({ adm });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error register' });
    }

});

//atualizar modificar senha
router.put('/reset_password', async (req, res) => {
    try {
        var { id, email, currentPassword, newPassword, confirmationPassword } = req.body;

        if (!id && !email && !currentPassword && !newPassword && !confirmationPassword)
            return res.status(400).send({ error: 'All data must be completed' });

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (!await bcrypt.compare(currentPassword, user.password))
            return res.status(400).send({ error: 'Current password is invalid' });

        if (!(newPassword === confirmationPassword))
            return res.status(400).send({ error: 'Passwords must be equal' });

        const password = await cryptoPassword(newPassword);
        
        const userModify = await User.findByIdAndUpdate(id, {
            email,
            password
        }, {new: true});

        await userModify.save();

        return res.send();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error update super adm' });
    }
});

//criar novo Coletor
router.post('/collector', async (req, res) => {
    const { name, user } = req.body;
    var { email, password } = user;

    try {
        if (await User.findOne({ email }))
            return res.status(403).send({ error: 'User Already exists' });

        const adm = await Adm.create({ name });
        password = await cryptoPassword(password);
        const user = await User.create({ email, password });
        await user.save();

        adm.user = user;
        adm.type = type.CollectorAdm;

        await adm.save();

        return res.status(201).send({ adm });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error register' });
    }

});


module.exports = app => app.use('/adm', router);