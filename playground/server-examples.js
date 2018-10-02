const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// let newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved Todo:', doc);
// }, (e) => {
//   console.log('Unable to save Todo');
// });

// ## CHALLENGE#05
// Create a new Todo with all fields filled

// let anotherTodo = new Todo({
//   text: 'Learn JavaScript',
//   completed: true,
//   completedAt: 123987456
// });

let anotherTodo = new Todo({
  text: 'Something to do'
});

anotherTodo.save().then((doc) => {
  console.log('Another Todo saved: ', doc);
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save Todo', e);
});

// ## CHALLENGE#06
// Create a new User model with:
// email - require it - trim it - set type - set min length of 1
// Create a new user with que model created

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

let someUser = new User({
  email: '    isabel@email.com    '
});

someUser.save().then((doc) => {
  console.log('User saved');
  console.log(doc);
}, (e) => {
  console.log('Unable to save User', e);
})
