const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');


const User = require('../models/User');
const People = require('../models/People');
const Adm = require('../models/Adm');
const Category = require('../models/Category');

const util = require('../util/util.json')


function generateToken(params = {}, secretCod) {
    return jwt.sign(params, secretCod, {
        expiresIn: 86400,
    });
}

async function cryptoPassword(password) {
    const hash = await bcrypt.hash(password, 10);

    return hash
}

// registro de usuario comum no sistema
async function registerUser(req, res) {
    try {
        const { name, user } = req.body
        const email = user.email;
        console.log(user.password)
        var password = await cryptoPassword(user.password);

        if (await User.findOne({ email }))
            return res.status(403).send({ error: 'User Already exists' });

        const splitDate = req.body.birthdate.split('/')
        const birthdate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0], 00, 00, 00, 00);

        const people = await People.create({ name, birthdate });

        const peopleUser = await User.create({ email, password });

        await peopleUser.save();

        people.user = peopleUser;

        console.log(people.user);

        await people.save();

        people.user.password = undefined;

        //mandar token de acesso
        return res.status(201).send({ Status: '201Created' });
    } catch (error) {
        console.log(error)
        return res.send({ error: 'Error on register' })
    }
}

//atenticar login baseado no tipo de usuario
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password' })


        user.password = undefined
        var people = await People.findOne({ user })
        if (people != null) {
            people.user = user
            return res.send({
                people,
                token: generateToken({ id: people.id }, authConfig.secretCommonUser)
            });
        }

        const adm = await Adm.findOne({ user })
        // checar tipo de adm, 0 = coletor e 1 = super
        if (adm != null) {
            var token;
            if (adm.type == util.CollectorAdm) {
                token = generateToken({ id: adm.id }, authConfig.secretCollectorAdm);
            } else {
                token = generateToken({ id: adm.id }, authConfig.secretSuperAdm);
            }
            adm.user = user;
            return res.send({
                adm,
                token
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error login' });
    }

}

async function loginWithFacebook() {

    console.log("opa");


}

//listar categorias
async function listCategorys(req, res) {

    try {
        const categorys = await Category.find();

        return res.send({ categorys });
    } catch (error) {
        return res.status(400).send({ erro: 'Error get categorys' });
    }
}



module.exports = { registerUser, login, listCategorys, loginWithFacebook };