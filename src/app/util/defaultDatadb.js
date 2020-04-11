const User = require('../models/User');
const Adm = require('../models/Adm');
const AdmType = require('./util.json');
const bcrypt = require('bcryptjs');

async function cryptoPassword(password) {
    const hash = await bcrypt.hash(password, 10);
 
     return hash
 }

async function createAdm() {
    //user
    const name = "Adm";
    const email = "adm@adm.com";
    var password = await cryptoPassword("adm@adm.com");
    const type = AdmType.SuperAdm;
    console.log("ola")

    if (await User.findOne({ email }))
        return "Created";

    try {
        const adm = await Adm.create({ name });

        const user = await User.create({ email, password });
        await user.save();

        adm.user = user;
        adm.type = type;

        await adm.save();
    } catch (error) {
        console.log(error)
    }
}


module.exports = { createAdm };
