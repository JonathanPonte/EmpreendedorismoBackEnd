const express = require('express');
const bodyParser = require('body-parser');
const DefaultDatabd = require('./src/app/util/DefaultDatadb');
const passport  = require('passport');
const rateLimiter = require('./src/app/middlewares/rateLimiter');
const cors = require('cors');

const app = express();

app.use(cors());

//entender o formato json
app.use(bodyParser.json({ limit: 1000000 }));

//entender quando passar parametros via url
app.use(bodyParser.urlencoded({limit: 1000000, extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(rateLimiter);


require('./src/app/routers/index')(app);

DefaultDatabd.createAdm();

app.get('/dashboard', (req, res) => {
    return res.send('Working!!');
})

app.listen(3000);
