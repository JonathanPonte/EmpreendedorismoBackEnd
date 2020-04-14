const express = require('express');
const authmiddleware = require('../middlewares/authSuperAdm');
const bcrypt = require('bcryptjs');

const Adm = require('../models/Adm');
const User = require('../models/User');
const Category = require('../models/Category');
const Scale = require('../models/Scale');
const Question = require('../models/Question');
const type = require('../util/util.json');

const router = express.Router();

async function cryptoPassword(password) {
    const hash = await bcrypt.hash(password, 10);

    return hash
}

router.use(authmiddleware);

//criar novo superAdm - Ok
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

//modificar senha - Ok
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
        }, { new: true });

        await userModify.save();

        return res.send();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error update super adm' });
    }
});

//criar novo adm Coletor - Ok
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

// crud Categorias

//criação da categoria - Ok (PROCURAR COMO FAZ UPLOAD DE IMAGEM)
router.post('/category', async (req, res) => {
    const { admId, title, image, description } = req.body;
    try {

        const adm = await Adm.findById(admId);

        if (!adm)
            return res.status(401).send({ erro: 'Adm not found' });

        const category = await Category.create({ title, image, description });
        await category.save();

        return res.status(201).send({ category });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error create category' });
    }
});

//update da categoria - OK
router.put('/category/:categoryId', async (req, res) => {
    const { title, image, description } = req.body
    try {
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
            title,
            image,
            description
        }, { new: true });

        await category.save();

        return res.send({ category });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error update category' });
    }

});

//Delete da categoria - Ok
router.delete('/category/:categoryId', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId);

        return res.send();
    } catch (error) {
        return res.status(400).send({ error: 'Error deleting project' });
    }
});

// CRUD escala

//create escala
router.post('/scale', async (req, res) => {
    const { title, minScaleValue, maxScaleValue, correctScores, category, questions } = req.body;
    try {

        const findCategory = await Category.findById(category);

        if (!category)
            return res.status(400).send({ error: 'Category does not exist' });

        const scale = await Scale.create({ title, minScaleValue, maxScaleValue, correctScores });
        var questionsScale = []

        await Promise.all(questions.map(async q => {
            const { title } = q;
            const question = new Question({ title });
            await question.save();
            questionsScale.push(question);
        }));

        scale.questions = questionsScale;
        await scale.save();
        findCategory.scales.push(scale);
        await findCategory.save();

        return res.send({ findCategory });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error create scale' });
    }

});

//delete escala
router.delete('/scale/:scaleId', async (req, res) => {
    try {

        const scale = await Scale.findByIdAndDelete(req.params.scaleId);

        const category = await Category.findById(scale.category);
        category.scales.delete(scale);

        await category.save()

        return res.send()
    } catch (error) {
        return res.status(400).send({ error: 'Error deleting scale' });
    }


});


module.exports = app => app.use('/adm', router);