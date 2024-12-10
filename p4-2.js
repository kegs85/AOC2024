const fs = require('node:fs');
const readline = require('node:readline');
let list1 = [];
let list2 = [];
let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p4.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data = []
  for await (const line of rl) {
    temp = line.split('');
    data.push(temp)
  }

  for (l = 1; l < data.length-1; l++) {
    for (c = 1; c < data[l].length-1; c ++) {
      console.log(l + '-' + c);
      if(data[l][c] == 'A') {
        if((data[l-1][c-1] == 'M' && data[l+1][c+1] == 'S') || (data[l-1][c-1] == 'S' && data[l+1][c+1] == 'M')) { //upLeft-downRight
          if((data[l-1][c+1] == 'M' && data[l+1][c-1] == 'S') || (data[l-1][c+1] == 'S' && data[l+1][c-1] == 'M')) {  
            output++;
            }
          }
      }
    }
  }
  console.log(output);
}

processLineByLine(); 

