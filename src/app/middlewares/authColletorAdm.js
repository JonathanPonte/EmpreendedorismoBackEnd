const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    //regex
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secretCollectorAdm, (err, decoded) => {

        if (err) {
            jwt.verify(token, authConfig.secretSuperAdm, (err, decoded) => {
                if (err) return res.status(401).send({ error: 'Token invalid' });

                req.userId = decoded.id;
                return next();
            });
        }
        if (decoded != undefined) {
            req.userId = decoded.id;
            return next();
        }
    });



};

