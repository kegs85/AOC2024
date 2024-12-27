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
  let nums = new Map;
  let gaps = new Map;
  for (i in data) {
    if (i%2 == 0) {
        nums.set(counter,[store.length,data[i]]);
        for (n = 0; n < data[i]; n++) {
            store.push(counter);
        }
        counter++;
    } else {
        gaps.set(counter-1,[store.length,data[i]]);
        for (n = 0; n < data[i]; n++) {
            store.push('.');
        }
    }
  }

  // console.log(store);
  // console.log(gaps);
  // console.log(nums);

  console.log(store);
  console.log(counter);
  counter--;

  loop1:
  for (z = counter; z > 0; z--) {
    let num = nums.get(z);
    let numLen = num[1];
    let ind = num[0];
    // console.log('ct: ' + z);
    // console.log(store);
    // console.log(gaps);

    loop2:
    for (let [key, value] of gaps) {
      if (value[1] >= numLen && value[0] < ind) {
        for (n = value[0]; n < (Number(value[0]) + Number(numLen)); n++) {
          store[n] = z;
          store[ind++] = '.';
        }        
        gaps.set(key,[Number(value[0]) + Number(numLen),value[1] - numLen]);

        // counter--;
        continue loop1;
      } 
    }

    // if (nums.get(z)[1] <= spaceCount) {
    //   gaps.set(store[i-1],spaceCount-nums.get(z));
    //   console.log('in: ' + Number(i));
    //   console.log('i: ' + store[i]);
    //   console.log(Number(nums.get(z)));
      
    //   let cap = Number(i)+Number(nums.get(z));
    //   console.log('cap: ' + cap);
    //   for (n = i; n <= cap; n++) {
    //     // console.log('n: ' + n);
    //     // console.log('i: ' + i);
    //     store[n] = z;
    //     i++
    //   }
    // }
    // loop3:
    // for (z = store.length -1; z > i; z--) {
    //   counter--;
    //   let num = '';
    //   let count = 0;
    //   if(store[z] != '.') {
    //       store[i] = store[z];
    //       store[z] = '.';
    //       continue loop1;
    //   }
    // }
  }

  console.log(store);

  for (v in store) {
    if(store[v] != '.') {
      console.log('val: ' +store[v] + '; num: ' + v);
        output += Number(v) * store[v];
    }
  }


//   console.log(data);
  // console.log(anti);
  console.log(output);
}

processLineByLine(); 

