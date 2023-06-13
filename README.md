"# node_passport_login" 

# first dependeceis
npm i express bcryptjs passport passport-local ejs express-ejs-layouts mongoose connect-flash express-session

 npm i -D nodemon
 

# salting and hashing 

> blockquote Hashing takes plaintext data elements and converts them into consistent ciphertext outputs used for data verification. Salting adds random characters to data, like passwords, to thwart hackers who look for consistent words and phrases in sensitive data in order to decode it.23 jui. 2022


```
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
  // returns hash
  console.log(hash);
  });
});
```
