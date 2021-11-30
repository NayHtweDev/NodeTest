const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'parents.json'
);

const getParentProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class ParentProduct {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
  }

  save() {
    getParentProductsFromFile(parents => {
      if (this.id) {
        const existingParentIndex = parents.findIndex(
          prod => prod.id === this.id
        );
        const updatedParents = [...parents];
        updatedParents[existingParentIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedParents), err => {
          console.log(err);
        });
      } else {
          console.log("here");
        this.id = Math.random().toString();
        parents.push(this);
        fs.writeFile(p, JSON.stringify(parents), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getParentProductsFromFile(parents => {
      const updatedParents = parents.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedParents), err => {
        if (!err) {
          console.log(err);
        }
      });
    });
  }
};
