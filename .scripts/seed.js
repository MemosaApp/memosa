var spawn = require('child_process').spawn;

var env = Object.create(process.env);

env.METEOR_ENV = 'seed';

var start = spawn('meteor', ['-p', '8765', '--once'], {env: env});

start.stdout.pipe(process.stdout);
