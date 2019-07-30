const http = require('http');
const webSocketServer = require('websocket').server;
const { serverMessageType, extractUsername, broadcastUserConnection, broadcastUserDisconnection } = require('../utils/utils');
const { wsport } = require('./config');

// start the websocket server
const server = http.createServer();
server.listen(wsport);
const wsServer = new webSocketServer({httpServer: server});

// maintains all connected users and their connection
let connections = {};


wsServer.on('request', wsRequest => {
  const username = extractUsername(wsRequest);
  if (username == null) { 
    wsRequest.reject(403, `A user named ${username} is already logged in, try another nickname`);
    return;
  }
  if (connections.hasOwnProperty(username)) {
    wsRequest.reject(403, `A user named ${username} is already logged in, try another nickname`);
    return;
  }
  
  const wsConn = wsRequest.accept(null, wsRequest.origin);
  console.log(`user ${username} connect`);

  // send list of connected users to the new connected used
  const msg = {
    "type": "USER_CONNECTED",
    "content": Object.keys(connections)
  };
  wsConn.sendUTF(JSON.stringify(msg));

  // persist the new connection
  connections[username] = wsConn;

  // listen event for incoming message
  wsConn.on('message', wsMessage => {
    if (wsMessage.type !== 'utf8') 
      return;
    
    const parsedMessage = JSON.parse(wsMessage.utf8Data);
    console.log(parsedMessage);
   
    const recipient = connections[parsedMessage.to];
    if (recipient == null || recipient == undefined)
      return;
    
    recipient.sendUTF(wsMessage.utf8Data);
  });

  // listen message for closing connection
  wsConn.on('close', connection => {
    console.log(`user ${username} disconnect`);
    broadcastUserDisconnection(username, connections);
    delete connections[username];
  });

  broadcastUserConnection(username, connections);
  
}); 