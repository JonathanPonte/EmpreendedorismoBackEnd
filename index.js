const express = require('express');
const bodyParser = require('body-parser');
const DefaultDatabd = require('./src/app/util/DefaultDatadb')


const app = express();

//entender o formato json
app.use(bodyParser.json());

//entender quando passar parametros via url
app.use(bodyParser.urlencoded({extended: false}));
 
require('./src/app/controllers/index')(app);

DefaultDatabd.createAdm();

app.listen(3000);
