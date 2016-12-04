var glob = require('glob');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');

let files = glob.sync('imports/**/*.js', {
  ignore: [
    '*.test.js',
  ],
});

files.forEach(f => {
  // Don't write the file if it would be empty
  exec(
    './node_modules/jsdoc-to-markdown/bin.js ' +
    f + ' -c jsdoc.json ',
    function (error, stdout, stderr) {
      if (stdout.trim() !== '') {
        fs.writeFile(f.replace('.js', '.md'), stdout, function callback() {
          console.log('>>> Generated docs for ' + f);
        });
      }
    }
  );
});
