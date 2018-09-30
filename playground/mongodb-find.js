// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // # Find All Todos
  // db.collection('Todos').find().toArray().then((docs) => {
  //   console.log('All Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // # Find only not completed Todos
// //  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
//   db.collection('Todos').find({
//     _id: new ObjectID('5bb0c5de9a657b2411676a44')
//   }).toArray().then((docs) => {
//     console.log('Pending Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
//   }, (err) => {
//     console.log('Unable to fetch todos', err);
//   });

  // # Count Todos
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // ## CHALLENGE#02
  // Find the users with name='Isabel' and list them to the console

  db.collection('Users').find({name: 'Isabel'}).toArray().then((docs) => {
    console.log('Users with name "Isabel":');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Users', err);
  });

  db.collection('Users').find({name: 'Isabel'}).count().then((count) => {
    console.log(`Count of Users with name "Isabel": ${count}`);
  }, (err) => {
    console.log('Unable to fetch Users', err);
  });


  client.close();
});
