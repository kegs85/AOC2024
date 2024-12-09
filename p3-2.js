const fs = require('node:fs');
const readline = require('node:readline');
let list1 = [];
let list2 = [];
let output = 0;

async function processFile() {
  const fileStream = fs.readFileSync('./p3.txt').toString();
  const regex = /(mul\(\d+,\d+\)|do\(\)|don\'t\(\))/g;
  const matches = fileStream.match(regex);
  let output = 0;
  let enabled = 1;
  for (v of matches) {
    switch (v) {
        case "don't()":
          enabled = 0;
          break;
        case "do()":
          enabled = 1
          break;
        default:
          console.log(v);
          if (enabled) {
            const results = v.split(/mul\(|,|\)/).filter(s => s.trim() !== "");
            output += results[0] * results[1];
          }
          break;
    }

  }

console.log(output);
}

processFile(); 

