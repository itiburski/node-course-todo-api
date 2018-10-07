const jwt = require('jsonwebtoken');

console.log('');
console.log('### hashing with jwt');
console.log('');

// jwt.sign
// jwt.verify

let data = {
  id: 10
}

let token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);








// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// console.log(`#1 : ${JSON.stringify(token)}`);
//
//
// // man in the middle changing the data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// console.log(`#2 : ${JSON.stringify(token)}`);
//
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// console.log(`#3: ${JSON.stringify(token.data)}`);
// console.log(`#3 resultHash: ${resultHash}`);
//
//
// if (resultHash === token.hash) {
//   console.log('Data was NOT changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }
