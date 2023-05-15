const fs = require("fs");

function getData() {
  return JSON.parse(fs.readFileSync("./assets/database/users.json"));
}

function setData(data) {
  fs.writeFileSync("./assets/database/users.json", JSON.stringify(data));
}

module.exports = {
  getData,
  setData,
};
