require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from './config';
import * as actions from './actions/index';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import faker from 'faker';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());


app.use((req, res) => {

  const matcher = req.url.split('?')[0].split('/').slice(1);

  let action = false;
  let params = null;
  let apiActions = actions;
  let sliceIndex = 0;

  for (const actionName of matcher) {

    if (apiActions[actionName]) {
      action = apiActions[actionName];
    }

    if (typeof action === 'function') {
      params = matcher.slice(++sliceIndex);
      break;
    }
    apiActions = action;
    ++sliceIndex;
  }

  if (action && typeof action === 'function') {
    action(req, params)
      .then((result) => {
        res.json(result);
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://localhost:%s', config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

var eventList = [];

app.post('/api/events', function(req, res) {
  newEvent = req.newEvent
  eventList.push(newEvent)
})

app.get('/api/events', function(req, res) {
  res.json(eventList);
})

app.get('/api/users', function(req, res) {
  var companies = ['American Foundation for Children with AIDS','Friends of Animals','Humane Farming Association','Glaucoma Foundation','Guide Dog Foundation for the Blind','National Breast Cancer Coalition Fund','Childrens Defense Fund','American Humane Association','ChildFund International','World Vision','American Rivers','Environmental Defense Fund']
  var departments = ['QA','Engineering','Marketing','Sales','HR','Finance']
  var jsonData = {
    users: [],
  }
  for (var i = 0; i < 2000; i++) {
    newUser = {};
    companyId = faker.random.number(12);
    deptId = faker.random.number(6);
    newUser.name = faker.name.findName();
    newUser.hours = faker.random.number(30);
    newUser.department = departments[deptId];
    newUser.locationOfWork = companies[companyId];
    jsonData.users.push(newUser);
  }
  console.log (JSON.stringify(jsonData));
  res.send(jsonData);
})