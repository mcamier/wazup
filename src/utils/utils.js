const generateGUID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

const extractUsername = (wsRequest) => { 
  const pathname = wsRequest.httpRequest.url;
  const test = pathname.split('/');
  let username = null;
  try {
    username = test[1];
  } catch (err) { }
  
  return username;
};

const broadcastUserConnection = (username, connections = {}) => { 
  const msg = {
    "type": "USER_CONNECTED",
    "content": [username]
  };
  broadcastExceptTo(msg, username, connections);
};

const broadcastUserDisconnection = (username, connections = {}) => { 
  const msg = {
    "type": "USER_CONNECTED",
    "content": [username]
  };
  broadcastExceptTo(msg, username, connections);
};

const broadcastExceptTo = (msg, username, connections = {}) => {
  Object.entries(connections).map(([key, value]) => {
    if (key !== username && value != null && value != undefined) {
      value.sendUTF(JSON.stringify(msg));
    }
  });
};
 
module.exports = {
  generateGUID,
  extractUsername,
  broadcastUserConnection,
  broadcastUserDisconnection,
  broadcastExceptTo
};