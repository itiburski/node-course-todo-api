const bcrypt = require('bcryptjs');

console.log('');
console.log('### hashing with bcryptjs');
console.log('');

let password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPassword = '$2a$10$ZQSF3jFjnXxI4hc8fykJP.C8F1CzKaM/nFmMi8EtHU0AUErGZWYKq';

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});
