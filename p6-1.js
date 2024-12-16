const fs = require('node:fs');
const readline = require('node:readline');

let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p6.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data = []
  let y = -1;
  let x = -1;
  let maxX = 0;
  let maxY = 0;
  let counter = 0;
  let found = new Set;

  for await (const line of rl) {
    let temp = [];
    temp = line.split('');
    let startPosTemp = temp.indexOf('^');
    
    if (startPosTemp > -1) {
      y = counter;
      x = startPosTemp;
      found.add(y + ':' + x);
      output++;
    }
    counter++;
    data.push(temp);
  }

  maxX = data[0].length;
  maxY = data.length;
  if (x == -1 || y == -1) {
    throw new Error("error, start not found");
  }
  
  let exit = 0;
  let direction = 0;

  loop1:
  while (exit == 0) {
    let newX = 0;
    let newY = 0;
    switch (direction) {
      case 0:
        newY = y-1;
        newX = x;
        break;
      case 1:
        newX = x+1;
        newY = y;
        break;
      case 2:
        newY = y+1;
        newX = x;
        break;
      case 3:
        newX = x-1;
        newY = y;
        break;
    }
    if (newX >= maxX || newY >= maxY || newX < 0 || newY < 0) {
      exit = 1;
    } else {
      switch(data[newY][newX]) {
        case '^':
        case '.':
          y = newY;
          x = newX;
          if(!found.has(y + ':' + x)) {
            output++;
            found.add(y + ':' + x);
          }
          break;
        case '#':
          direction = (direction + 1) % 4
          break;
      }

      // console.log('y:' + y + ';  x:' + x + ';  d:' + direction + ';   o:' + data[newY][newX])
    }
  }


  console.log(output);
  console.log(found.size);
}

processLineByLine(); 

