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

  for (l = 0; l < data.length; l++) {
    for (c = 0; c < data[l].length; c ++) {
      console.log(l + '-' + c);
      if(data[l][c] == 'X') {
        if(c>2 && data[l][c-1] == 'M' && data[l][c-2] == 'A' && data[l][c-3] == 'S') { //left
              output++;
          }
        if(l>2 && c>2 && data[l-1][c-1] == 'M' && data[l-2][c-2] == 'A' && data[l-3][c-3] == 'S') { //up+left
              output++;
          }
        if(l>2 && data[l-1][c] == 'M' && data[l-2][c] == 'A' && data[l-3][c] == 'S') { // up
              output++;
          }
        if(l>2 && c<(data[l].length-3) && data[l-1][c+1] == 'M' && data[l-2][c+2] == 'A' && data[l-3][c+3] == 'S') { //up+right
              output++;
          }
        if(c<(data[l].length-3) && data[l][c+1] == 'M' && data[l][c+2] == 'A' && data[l][c+3] == 'S') { //right
              output++;
          }
        if(l<(data.length-3) && c<(data[l].length-3) && data[l+1][c+1] == 'M' && data[l+2][c+2] == 'A' && data[l+3][c+3] == 'S') { //down+right
              output++;
          }
        if(l<(data.length-3) && data[l+1][c] == 'M' && data[l+2][c] == 'A' && data[l+3][c] == 'S') { //down
              output++;
          }
        if(l<(data.length-3) && c>2 && data[l+1][c-1] == 'M' && data[l+2][c-2] == 'A' && data[l+3][c-3] == 'S') { //down+left
              output++;
          }
      }
    }
  }
  console.log(output);
}

processLineByLine(); 

