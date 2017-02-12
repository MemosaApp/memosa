import gulp from 'gulp';
import glob from 'glob';
import fs from 'fs';

gulp.task('build:scss', (cb) => {
  glob('imports/**/*.scss', {}, (err, files) => {
    if (err) {
      cb(err);
    }

    const out = 'client/styles/_import.scss';
    fs.writeFileSync(out,
`/**
 * THIS FILE IS AUTO-GENERATED
 *
 * ANY CHANGE YOU MAKE TO THIS WILL BE OVERWRITTEN
 */
`);

    files.sort((a, b) => {
      return a < b ? -1 : 1;
    }).forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');

      fs.appendFileSync(out, content);
    });

    cb();
  });
});
