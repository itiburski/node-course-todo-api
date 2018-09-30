// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // findOneAndUpdate(filter, update, options, callback){Promise}

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bb0d61f9a657b2411676e6a')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  // ## CHALLENGE#04
  // Update the name of the user to something else and
  // increment by 1 the user's age

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5bb0bf9f38ba329c284a981c')
  }, {
    $set: {
      name: 'Isabel'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // client.close();
});
