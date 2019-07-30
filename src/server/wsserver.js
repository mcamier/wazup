import http from 'http';
import {server as webSocketServer} from 'websocket';

const webSocketsServerPort = 4242;

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({httpServer: server});

let clients = {};

const getUniqueID = () => {
  const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', wsRequest => {
  console.log(wsRequest);
  const connection = wsRequest.accept(null, wsRequest.origin);
});

wsServer.on('close', wsConnection => {
  console.log('connection closed');
});

wsServer.on('connect', wsConnection => {
  var user_id = getUniqueID();
  clients[user_id] = wsConnection;
  console.log(`connection accepted`);

  wsConnection.on('message', message => {
    console.log(`message received ${message}`);
  });
});