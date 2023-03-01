const { copyFileSync } = require('fs');

function init(args) {
  console.log('Copying: ', args);
  copyFileSync(args[0], args[1]);
}

init(process.argv.slice(2));
