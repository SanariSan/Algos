function wipe() {
  const windows = process.platform.indexOf('win') === 0;
  let stdout = '';

  if (windows === false) {
    stdout += '\x1B[2J';
  } else {
    const lines = process.stdout.getWindowSize()[1];

    for (let i = 0; i < lines; i++) {
      stdout += '\r\n';
    }
  }

  stdout += '\x1B[0f';
  process.stdout.write(stdout);
}

wipe();
