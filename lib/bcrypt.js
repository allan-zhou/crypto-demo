const bcrypt = require('bcrypt');

let saltRounds = 10; //work factor
let myPlainPassword = 'zhoujl';

// hash password
bcrypt.genSalt(saltRounds, (err, salt) => {
    console.log(salt);
    bcrypt.hash(myPlainPassword, salt, (err, hash) => {
        console.log('====bcrypt.genSalt callback hash======');
        console.log(hash);
    })
})
// salt: $2a$10$8NcjSY24xCoNpwJpmBYgpu
// hash: $2a$10$8NcjSY24xCoNpwJpmBYgpu1RThN8cYK5.zYqjUqrEHCQFr/PGVZsq

// bcrypt.hash(myPlainPassword, saltRounds, (err, hash) => {
//     console.log('====bcrypt.hash======');
//     console.log(hash);
// })

let mysalt = '$2a$10$8NcjSY24xCoNpwJpmBYgpu';
let myHashedPwd = '$2a$10$8NcjSY24xCoNpwJpmBYgpu1RThN8cYK5.zYqjUqrEHCQFr/PGVZsq';

bcrypt.hash(myPlainPassword, mysalt, (err, hash) => {
    console.log(hash);
    console.log(hash == myHashedPwd);
})

// check password
bcrypt.compare(myPlainPassword, myHashedPwd, (err, matched) => {
    console.log('====bcrypt.compare======');
    console.log(matched);
})
