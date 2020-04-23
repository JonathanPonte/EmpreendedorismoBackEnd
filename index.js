const express = require('express');
const bodyParser = require('body-parser');
const DefaultDatabd = require('./src/app/util/DefaultDatadb');
const passport  = require('passport');

const app = express();

//entender o formato json
app.use(bodyParser.json());

//entender quando passar parametros via url
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

require('./src/app/routers/index')(app);

DefaultDatabd.createAdm();



app.listen(3000);
