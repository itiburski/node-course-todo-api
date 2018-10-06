const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}): remove multiple documents
// Remove all the documents that match the query.
// If the query is an empty object {}, then delete all the documents

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({}) :
// Get the first document that match the query and remove it
// Also return the document removed

Todo.findOneAndRemove({text : 'some text again'}).then((todo) => {
  console.log('removed with findOneAndRemove');
  console.log(todo);
})

// Todo.findByIdAndRemove('')
// Find the document by id and remove it. Also return the document removed

Todo.findByIdAndRemove('5bb8a7059a657b241167e5dc').then((todo) => {
  console.log('removed with findByIdAndRemove');
  console.log(todo);
});
