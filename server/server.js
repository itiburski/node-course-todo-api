require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// CHALLENGE
// Validate id with isValid - if not, send 404 status and an empty body send
// query the todos collection using findById
// - success:
// --- if todo: send it back
// --- if not todo: 404 status with empty body
// - error: 400 status, send empty body back
//
// GET /todos/12345
app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// CHALLENGE
// get the id
// Validate id with isValid - if not, send 404 status and an empty body send
// remove todo by id
// - sucess: if no doc, send 404
//           if doc, send doc back with 200
// - error: 400 with empty body
app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo}); // .status(200) is added implicitly
  }).catch((e) => {
    res.status(400).send();
  });
});

// CHALLENGE
// Make PATCH /todos/:id route private
// - add authenticate middleware
// - update the query using findOneAndUpdate
// - update the tests
// --- update the two existing tests using the first user
// --- add a new test: try to update the first todo as second user
// ----- assert 404 response
app.patch('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.sendStatus(404);
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

// CHALLENGE
// POST /users
// pick email and password using lodash before save

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then((doc) => {
    return user.generateAuthToken();

    // res.send({user: doc});
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// CHALLENGE
// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
