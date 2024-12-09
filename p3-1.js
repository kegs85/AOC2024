const fs = require('node:fs');
const readline = require('node:readline');
let list1 = [];
let list2 = [];
let output = 0;

async function processFile() {
  const fileStream = fs.readFileSync('./p3.txt').toString();
  const regex = /mul\(\d+,\d+\)/g
  const matches = fileStream.match(regex);
  let output = 0;
  for (v of matches) {
    const results = v.split(/mul\(|,|\)/).filter(s => s.trim() !== "");
    output += results[0] * results[1];
  }

console.log(output);
}

processFile(); 

