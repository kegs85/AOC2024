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
    }
    counter++;
    data.push(temp);
  }

  let startPosX = x;
  let startPosY = y;

  maxX = data[0].length;
  maxY = data.length;
  if (x == -1 || y == -1) {
    throw new Error("error, start not found");
  }
  
  console.log(startPosY + ':' + startPosX);
  let exit = 0;
  let direction = 0;
  let blocks = new Set;
  let obst = new Set;
  let bad = new Set;

  // if(checkPath(data,x,y,direction,maxX, maxY) == true) {
  //   if(!obst.has(y + ':' + x)) {
  //     output++;
  //     obst.add(y + ':' + x);
  //   }
  // }

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
          if(!bad.has(newY + ':' + newX) && !obst.has(newY + ':' + newX) && (newY + ':' + newX) != (startPosY + ':' + startPosX)) {
            if(checkPath(data, x, y, newX, newY, direction, maxX, maxY) == true) {
              if(!obst.has(newY + ':' + newX)) {
                output++;
                obst.add(newY + ':' + newX);
              } 
              console.log('                       yes');
            } else {
              bad.add(newY + ':' + newX);
              console.log('                       no');
            }
          }
          y = newY;
          x = newX;
          if(!found.has(y + ':' + x)) {
            found.add(y + ':' + x);
          };
          console.log(found.size);
          // console.log(y + ':' + x);
          break;
        case '#':
          blocks.add(y + ':' + x);
          direction = (direction + 1) % 4
          break;
      }
      // console.log(data[0]);

      // console.log('y:' + y + ';  x:' + x + ';  d:' + direction + ';   o:' + data[newY][newX])
    }
  }
  console.log(obst);
  // console.log(data);
  for(b of obst) {
    let block = b.split(':');
    // console.log(data[block[0]][block[1]]);
    data[block[0]][block[1]] = "O";
    // console.log(data[block[0]][block[1]]);
  }

  // for (o in obst) {
  //   console.log(obst[o] + ',' + obst[++o] + ',' + obst[++o] + ',' + obst[++o] + ',' + obst[++o] + ',' + obst[++o] + ',' + obst[++o] + ',' + obst[++o] + ',' + obst[++o]);
  // }
  console.log('                                          ');
  // console.log(data);

  console.log(output);
  console.log(bad.size);
  // console.log(found.size);
}

function checkPath(map, currentx, currenty, newBlockX, newBlockY, direction2, maxX2, maxY2) {
  let maxSize = map.length * map[0].length * 10;
  direction2 = (direction2 + 1) % 4
  let counter = 0;
  // console.log('new');
  // console.log(newBlockY + ':' + newBlockX);
  // console.log('old');
  // console.log(currenty + ':' + currentx);
  let oldVal = map[newBlockY][newBlockX];
  map[newBlockY][newBlockX] = '#';

  while (counter < maxSize) {
    let newX2 = 0;
    let newY2 = 0;
    switch (direction2) {
      case 0:
        newY2 = currenty-1;
        newX2 = currentx;
        break;
      case 1:
        newY2 = currenty;
        newX2 = currentx+1;
        break;
      case 2:
        newY2 = currenty+1;
        newX2 = currentx;
        break;
      case 3:
        newY2 = currenty;
        newX2 = currentx-1;
        break;
    }
    
    // (counter > 0 && counter % 1000000 == 0) ? console.log(counter) : null;
    counter++;
    // console.log(newY2 + ':' + newX2);
    if (newX2 >= maxX2 || newY2 >= maxY2 || newX2 < 0 || newY2 < 0) {
      map[newBlockY][newBlockX] = oldVal;
      return false;
    } else {
      switch(map[newY2][newX2]) {
        case '^':
        case '.':
          currenty = newY2;
          currentx = newX2;
          break;
        case '#':
          direction2 = (direction2 + 1) % 4
          break;
      }
    }
  }
  map[newBlockY][newBlockX] = oldVal;
  return true;

}


processLineByLine(); 

