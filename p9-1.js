const fs = require('node:fs');
const readline = require('node:readline');

let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p9.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data = []  

  for await (const line of rl) {
    let temp = [];
    temp = line.split('');
    data.push(...temp);
  }
  let counter = 0;
  let store = [];
  for (i in data) {
    if (i%2 == 0) {
        for (n = 0; n < data[i]; n++) {
            store.push(counter);
        }
        counter++;
    } else {
        for (n = 0; n < data[i]; n++) {
            store.push('.');
        }
    }
  }

  loop1:
  for (i in store) {
    if(store[i] == '.') {
        loop2:
        for (z = store.length -1; z > i; z--) {
            if(store[z] != '.') {
                store[i] = store[z];
                store[z] = '.';
                continue loop1;
            }
        }
    }
  }

  for (v in store) {
    if(store[v] != '.') {
        output += Number(v) * store[v];
    }
  }


//   console.log(data);
  // console.log(anti);
  console.log(output);
}

processLineByLine(); 

