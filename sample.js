const { readFileSync, writeFile } = require("fs");
const { parse } = require("./src/index.js");

const i = readFileSync("./sample.txt", "utf8");
const jsonString = JSON.stringify(parse(i), undefined, 2);

writeFile("./output.json", jsonString, err => {
  if (err) console.log(err);
  else console.log("Write successful");
});
