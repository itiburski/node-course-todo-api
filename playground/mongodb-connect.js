// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// // # Generating ObjectID manually
// var obj = new ObjectID();
// console.log(obj);

// // ## destructuring
// var user = {name: 'Andrew', age: 25};
// var {name} = user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Someting to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

// ## CHALLENGE#01
// ## Insert new doc into Users (name, age, location)

//   db.collection('Users').insertOne({
//     name: 'Isabel',
//     age: 34,
//     location: 'Florianopolis'
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unable to insert user', err);
//     }
//
//     console.log(JSON.stringify(result.ops, undefined, 2));
//     console.log(result.ops[0]._id.getTimestamp())
//   });

  client.close();
});
