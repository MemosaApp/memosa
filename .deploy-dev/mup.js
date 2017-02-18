module.exports = {
  servers: {
    memosaDev: {
      host: '138.68.61.242',
      username: 'root',
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
      opts: {
        port: 22,
      },
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
      cleanAfterBuild: true, // default
      debug: true,
    },

    env: {
      ROOT_URL: 'https://dev.memosa.tech',
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
    docker: {
      image: 'abernix/meteord:base'
    },
    deployCheckWaitTime: 120,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
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
