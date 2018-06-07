/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const fs = require('fs');
const archiver = require('archiver');

// create a file to stream archive data to.
const output = fs.createWriteStream(`build_${new Date().getTime().toString()}.zip`);
const archive = archiver('zip', {
  zlib : {level : 9} // Sets the compression level.
});

// listen for all archive data to be written
output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// good practice to catch this error explicitly
archive.on('error', (err) => {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

// append a file from stream
archive.append(fs.createReadStream('build/favicon.ico'), {name : 'favicon.ico'});
archive.append(fs.createReadStream('build/asset-manifest.json'), {name : 'asset-manifest.json'});

// append files from a directory
// archive.directory('build/images/', 'images/');
archive.directory('build/static/', 'static/');

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();
