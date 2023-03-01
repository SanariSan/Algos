const { renameSync } = require('fs');

function init(args) {
  console.log('Moving: ', args);
  renameSync(args[0], args[1]);
}

init(process.argv.slice(2));
