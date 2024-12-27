const fs = require('node:fs');
const readline = require('node:readline');

let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p10.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data = [];
  let heads = new Set;

  for await (const line of rl) {
    let temp = [];
    temp = line.split('');
    data.push(temp);
  }

  function findPath(pos, count,ends) {
    let ln = Number(pos[0]);
    let cl = Number(pos[1]);
    let curr = Number(data[ln][cl]);
    console.log(ln + ':' + cl + ' => ' + curr);

    if (curr == 9) {
      
        count++;
      
    } else {
      if (ln > 0 && (data[Number(ln)-1][cl] == curr + 1)) { //up
        // console.log('up');
        count = findPath([Number(ln)-1,cl], count,ends);
      }
      if (cl < colMax-1 && (data[ln][Number(cl)+1] == curr + 1)) { //right
        // console.log('right');
        count = findPath([ln,Number(cl)+1], count,ends);
      }
      if (ln < lineMax-1 && (data[Number(ln)+1][cl] == curr + 1)) { //down
        // console.log('down');
        count = findPath([Number(ln)+1,cl], count,ends);
      }
      if (cl > 0 && (data[ln][Number(cl)-1] == curr + 1)) { //left
        // console.log('left');
        count = findPath([ln,Number(cl)-1], count,ends);
      }
    }
    return count;
    
  }

  for (l in data) {
    for (c in data[l]) {
      if (data[l][c] == 0) {
        heads.add(l + ':' + c);
      }
    }
  }
  
  let lineMax = data.length;
  let colMax = data[0].length;

  // console.log(heads);
  for (z of heads) {
    let ends = new Set();
    z = z.split(':');
    let sum =  findPath([z[0],z[1]],0,ends);
    console.log(sum);
    output+= sum;
  }


//   console.log(data);
  // console.log(anti);
  console.log(output);
}

processLineByLine(); 

