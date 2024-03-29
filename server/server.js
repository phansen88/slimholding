const express = require('express');
const dotenv = require('dotenv').config({ path: '.env.development.local' });
const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const axios = require('axios').default;
const wsseTEst = require('./middleware/wsse-test');
const Users = require('./models/Users');
const Incident = require('./models/Incident');
const UIModules = require('./models/UIModules');
const Admin = require('./models/Admin');

const app = express(); // create express app
const port = process.env.PORT || 5000;
app.use(helmet());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '.../build')));
}
app.get('/admin/dictionary', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await Admin.getDictionary();
    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/table/:tablename', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const data = await Incident.getIncidents(req.query);
    res.send(data);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/home', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const user = await Users.getUsers();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/ui_modules', async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  try {
    const user = await UIModules.getUIModules();
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = await Users.createUser(req);
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});
app.get('/casefiles', async (req, res) => {
  try {
    const token2 = wsseTEst.wsseHeader(
      process.env.PENNEO_KEY,
      process.env.PENNEO_SECRET
    );

    await axios
      .get('https://sandbox.penneo.com/api/v3/casefiles', {
        headers: {
          Accept: 'application/json',
          'X-WSSE': token2,
          Authorization: 'WSSE profile="UsernameToken"',
        },
      })
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/', (req, res) => {
  res.send('This is from express.js');
});

// start express server on port 5000
app.listen(port, () => {
  console.log('server started on port' + port);
  // console.log(dotenv);
  openBrowser('http://localhost:' + port);
});
