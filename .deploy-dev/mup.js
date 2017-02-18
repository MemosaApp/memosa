module.exports = {
  servers: {
    memosaDev: {
      host: '138.68.61.242',
      username: 'root',
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'memosa',
    path: '../',
    servers: {
      memosaDev: {},
    },

    buildOptions: {
      // build with the debug mode on
      debug: true,
    },

    env: {
      ROOT_URL: 'dev.memosa.tech',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    ssl: {
      // Enables let's encrypt (optional)
      autogenerate: {
        email: 'admin@memosa.com',
        domains: 'dev.memosa.tech'
      }
    },

    // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      memosaDev: {},
    },
  },
};
