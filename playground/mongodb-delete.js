// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // # deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // # deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // # findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })

  // ## CHALLENGE#03
  // Use deleteMany to delete all the users with name: 'Isabel'

  db.collection('Users').deleteMany({name: 'Isabel'}).then((result) => {
    console.log('CHALLENGE#03 - Part 1');
    console.log('  result:', result.result);
    console.log(`  deletedCount: ${result.deletedCount}`);
  })

  // Use deleteOne to delete the user with name: 'Mike', but using _id

  db.collection('Users').findOneAndDelete({
    _id: ObjectID('5bb0dae89a657b2411677136')
  }).then((result) => {
    console.log('CHALLENGE#03 - Part 2');
    console.log(result);
    if (result.value !== null) {
      console.log(`User ${result.value.name} deleted`);
    }
  })

  // ## end CHALLENGE#03


  // client.close();
});
