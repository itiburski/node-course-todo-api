const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');


beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  // CHALLENGE
  // write the test case for the cases:
  // - todo not found: make sure you get a 404 back
  // - ObjectID not valid: make sure you get a 412 back
  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

// CHALLENGE
// query database using findById
// make sure it does not exist: expect(todo).toNotExist();
// add catch clause
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ObjectID is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {

  // CHALLENGE
  // grab id of first item
  // update text, set completed=true
  // 200
  // text is changed, completed is true, completedAt is a number (.toBeA)
  it('should update the todo', (done) => {
    let hexId = todos[0]._id.toHexString();;
    let todo = {
      text: "new text",
      completed: true
    }

    request(app)
      .patch(`/todos/${hexId}`)
      .send(todo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todo.text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  // CHALLENGE
  // grab id of second todo item
  // update text, set completed=false
  // 200
  // text is changed, completed is false, completedAt is null (.toNotExist)
  it('should clear completedAt when todo is not completed', (done) => {
    let hexId = todos[1]._id.toHexString();
    let text = "uncompleted todo";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
          text,
          completed: false
        })
      .expect(200)
      .expect((res) => {
        let bodyTodo = res.body.todo;
        expect(bodyTodo.text).toBe(text);
        expect(bodyTodo.completed).toBe(false);
        expect(bodyTodo.completedAt).toNotExist();
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ObjectID is invalid', (done) => {
    request(app)
      .patch('/todos/123abc')
      .expect(404)
      .end(done);
  });

})

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

// CHALLENGE
// Call get request does not providing x-auth token
// expect a 401 back and response body be an empty object (toEqual)
  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    let email = 'example@example.com';
    let password = '123mnb!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => done(e));
      });
  });

// CHALLENGE
// send and invalid email and invalid password
// expect 400
  it('should return validation error if request invalid', (done) => {
    let email = 'example@';
    let password = '1m!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });

// CHALLENGE
// send an email already in use in seed data
// expect 400
  it('should not create user if email in use', (done) => {
    let email = users[0].email;
    let password = '123mnb!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

// CHALLENGE
// send an invalid password
// expect 400 status, x-auth token does not exist, user.tokens.length === 0
  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });

});
