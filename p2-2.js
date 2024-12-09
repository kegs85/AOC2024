const fs = require('node:fs');
const readline = require('node:readline');
let list1 = [];
let list2 = [];
let output = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('p2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  loop1: 
    for await (const line of rl) {
      temp = line.split(' ');
      let pass = 0;
      // console.log(temp);

      loop2:
      for (n=0;n <= temp.length; n++) {
        let interim = [...temp];
        // console.log(n)
        // console.log(n + ':' + interim);
        if (n>0) {
          interim.splice(n-1,1);
        }
        let diff = interim[0] - interim[1];
        let pol = diff;
        // console.log(n + ':' + interim);

        if(diff < -3 || diff == 0 || diff > 3) {
          continue;
        }
          // console.log(diff);
        
        loop3:
          for(i=1;i <= interim.length-2; i++) {
            diff = interim[i] - interim[i+1];
            // console.log(diff);
            switch(pol) {
              case -3:
              case -2:
              case -1:
                if (diff < -3 || diff >= 0) {
                  // console.log('neg');
                  continue loop2;
                }
                break;
              case 1:
              case 2:
              case 3:
                if (diff <= 0 || diff > 3) {
                  // console.log('pos');
                  continue loop2;
                }
                break;
              case 0:
              default:
                // console.log('zero');
                continue loop2;
                break;
            }
          }
          // console.log('output+');
          output++;
          continue loop1;
        }
      
    }
  console.log(output);
}



processLineByLine(); 

