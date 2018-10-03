const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// let id = '5bb3e23f0921a6b93d70c0b8';
//
// if (!ObjectID.isValid(id+11)){
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));


// CHALLENGE
// Query the User with some ID using findById
// handle the 3 cases:
// - when user exists
// - when user does not exist
// - when another error occourred

let idUser = '5bb29af6ef6c09ad32fc042e';

User.findById(idUser).then((user) => {
  if (!user) {
    return console.log('User not found with this id');
  }
  console.log('User By Id');
  console.log(user);
}, (e) => {
  console.log(e);
});
