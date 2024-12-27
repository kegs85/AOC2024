const fs = require('node:fs');
const readline = require('node:readline');

let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p7.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data = []  

  for await (const line of rl) {
    let temp = [];
    temp = line.trim().split(':');
    temp[1] = temp[1].trim();
  
    data.push(temp);
  }
  let counter = 0;

  loop1:
  for(line of data) {
    console.log('count: ' + counter++);
    let total = Number(line[0]);
    let numbers = line[1].split(' ');
    let len = Math.pow(3,(numbers.length));
    loop2:
    for (v=0; v<len; v++) {
      let subtotal = 0;
      let bin = (v + len).toString(3).split('');
      loop3:
      for (i in numbers) {
        if (i == 0) {
          subtotal = numbers[i]
        } else {
          switch (bin[i]) {
            case '0':
              subtotal = Number(subtotal) + Number(numbers[i]);
              break;
            case '1':
              subtotal = Number(subtotal) * Number(numbers[i]);
              break;
            case '2':
              subtotal = Number(subtotal.toString() + numbers[i].toString());
              break;
          }
        }
      }
      if(subtotal == total) {
        output += total;
        continue loop1;
      }

    }
  }

  console.log(output);
}

processLineByLine(); 

