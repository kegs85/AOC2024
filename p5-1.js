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
    loop2:
    for(v=0;v<g.length;v++) {
      if(v==((g.length-1)/2)) {
        middle = Number(g[v]);
      }
      loop3:
      for (r in rules) {
        if(rules[r][1] == g[v]) {
          loop4:
          for(c=v+1;c<g.length;c++) {
            if (rules[r][0] == g[c]) {
              continue loop1;
            }
          }
        }
      }
    }
    console.log(middle);
    output += middle;
  }

  console.log(output);
}

processLineByLine(); 

