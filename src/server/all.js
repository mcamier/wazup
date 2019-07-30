const { fork } = require('child_process');

const server = fork('src/server/server.js');
const wsserver = fork('src/server/wsserver.js');