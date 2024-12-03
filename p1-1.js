const fs = require('node:fs');
const readline = require('node:readline');
let list1 = [];
let list2 = [];
let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    temp = line.split('   ');
    list1.push(temp[0]);
    list2.push(temp[1]);

  }

  list1.sort();
  list2.sort();

  list1.forEach((element, index) => {
    output += Math.abs(element - list2[index]);
  });

  console.log(output);
}

processLineByLine(); 

