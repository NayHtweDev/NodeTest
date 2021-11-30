const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'users.json'
);

const getUsersFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

  module.exports = class User {
    constructor(id, name, phone, email, password, token) {
      this.id = id;
      this.name = name;
      this.phone = phone;
      this.email = email;
      this.password = password;
      this.token = token;
    }

    save() {
        getUsersFromFile(users => {
          if (this.id) {
            const existingUserIndex = users.findIndex(
              prod => prod.id === this.id
            );
            const updatedUsers = [...users];
            updatedUsers[existingUserIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedUsers), err => {
              console.log(err);
            });
          } else {
            this.id = Math.random().toString();
            users.push(this);
            fs.writeFile(p, JSON.stringify(users), err => {
              console.log(err);
            });
          }
        });
      }
};
  