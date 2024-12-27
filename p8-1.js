const fs = require('node:fs');
const readline = require('node:readline');

let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p8.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data = []  

  for await (const line of rl) {
    let temp = [];
    temp = line.split('');
    data.push(temp);
  }

  let coords = new Map;
  let anti = new Set;
  for(l in data) {
    for (c in data[l]) {
      if (data[l][c] != '.') {
        if (coords.has(data[l][c])) {
          coords.get(data[l][c]).push([l,c]);
        } else {
          coords.set(data[l][c],[[l,c]]);
        }
      }

    }
  }
  let lineMax = Number(data.length);
  let colMax = Number(data[0].length);
  console.log(coords);
  for (a of coords) {
    // console.log(a[0]);
    if(a[1].length < 2) {
      continue;
    }
    for(c of a[1]) {
      for (d of a[1]) {
        let lineDiff = Number(c[0]) - Number(d[0]);
        let columnDiff = Number(c[1]) - Number(d[1]);
        // console.log(c + '::' + d);
        // console.log(lineDiff + '-' + columnDiff);
        if (lineDiff != 0 || columnDiff != 0) {
          let tempPos = [Number(c[0]) + Number(lineDiff), Number(c[1]) + Number(columnDiff)];
          // console.log(tempPos[0] + ':' + tempPos[1]);
          // console.log((0 <= Number(tempPos[0]) && Number(tempPos[0]) < lineMax));

          if (0 <= Number(tempPos[0]) && Number(tempPos[0]) < lineMax && 0 <= Number(tempPos[1]) && Number(tempPos[1]) < colMax) {
            // console.log('add');
            if(!anti.has(tempPos[0]+ ':' + tempPos[1])) {
                output++;
                anti.add(tempPos[0]+ ':' + tempPos[1]);
              } 
          }
       }


      }

    }
  }
  // console.log(anti);
  console.log(output);
}

processLineByLine(); 

