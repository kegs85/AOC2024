const fs = require('node:fs');
const readline = require('node:readline');

let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p5.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data = []
  let rules = []
  let check = 0;
  for await (const line of rl) {
    let temp = [];
    if(line.length == 0) {
      check = 1;
      continue;
    }
    if(check) {
      temp = line.split(',')
      data.push(temp);
    } else {
      temp = line.split('|')
      rules.push(temp);
    }
  }
  
  loop1:
  for (g of data) {
      let middle = 0;
      let middleNum = 0;
      let dirty = 0;
    loop2:
    for(v=0;v<g.length;v++) {
      middleNum = (g.length-1)/2;
      if(v==middleNum) {
        middle = Number(g[v]);
      }
      loop3:
      for (r in rules) {
        let counter = 0;
        if(rules[r][1] == g[v]) {
          loop4:
          for(c=v+1;c<g.length;c++) {
            if (rules[r][0] == g[c]) {
              dirty = 1;
              let toMove = g[c];
              let first = g.slice(0,v);
              let second = g.slice(v,c);
              let last = g.slice(c+1);
              g = [...first,toMove,...second,...last];
              v=-1;
              continue loop2;
            }
          }
        }
      }
    }
    if(dirty) {
      output += middle;
    }
  }

  console.log(output);
}

processLineByLine(); 

