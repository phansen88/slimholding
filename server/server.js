const express = require('express');
const dotenv = require('dotenv').config({ path: '.env.development.local' });
const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const Users = require('./models/Users');
const creaeUsers = require('./models/createUser');

const app = express(); // create express app
const port = process.env.PORT || 5000;
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '.../build')));
}

app.get('/home', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const user = await Users.getUsers();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await creaeUsers.createUser(req);
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/', (req, res) => {
  // res.send(backend);
  res.send('This is from express.js');
});

// start express server on port 5000
app.listen(port, () => {
  console.log('server started on port' + port);
  // console.log(dotenv);
  openBrowser('http://localhost:' + port);
});
