const { rmSync } = require('fs');

function init(args) {
  console.log('Removing: ', args);
  for (let el of args) {
    rmSync(el, { force: true, recursive: true });
  }
}

init(process.argv.slice(2));
