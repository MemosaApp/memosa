Package.describe({
  name: 'capsulecat:glob-scss',
  version: '0.0.1',
  summary: 'Glob files in your imports directory',
});

Package.onUse((api) => {
  console.log('using');
  api.use('fourseven:scss');
  //
  // const path = Npm.require('path');
  // const glob = Npm.require('glob');
  //
  // const options = {
  //   cwd: path.join(path.resolve('.')),
  // };
  //
  // console.log(options);

  // let files = glob.sync('imports/**/*.scss', options);
  //
  // files = files.map(f => path.join(path.resolve('.'), f));
  //
  // console.log(files);
  // api.addFiles([
  //   '../../imports/packages/Fab/components/_Fab.scss',
  // ], ['client'], { isImport: true });
});
