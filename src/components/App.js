import React, { useEffect, useState } from 'react';
import openWebSocketAsync from '../utils/webSocketPromise';

import ChatRoomPanel from './ChatRoomPanel';
import LoginForm from './LoginScreen';
import UsersPanel from './UsersPanel';

export default function App() {
  const [connection, setConnection] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState({});

  const selectNewCurrentChannel = user_id => setCurrentChannel(user_id);

  const extractUsersList = () => Object.keys(channels);
  const isUserLogged = () => loggedUser !== null && loggedUser !== undefined;

  const getCurrentChannelMessages = () => { 
    const channel = channels[currentChannel];
    return (channel != undefined) ? channel.messages : undefined;
  };

  const addUserChannels = (usernames) => { 
    const newChannel = { ...channels };
    usernames.forEach((username, index) => { 
      newChannel[username] = { "messages": [] };
    });
    setChannels(newChannel);
  };

  const removeUserChannels = () => { 
    delete channels[username];
    setChannels(channels);
    console.log('delete user');
    console.log(channels);
  };

  const onMessageCallback = (message) => {
    const data = JSON.parse(message.data);
    console.log(data.type);
    if (data.type == "MESSAGE_EVENT") {
      console.log('we received a message');
    } else if (data.type == "USER_CONNECTED") {
      addUserChannels(data.content);
    } else if (data.type == "USER_DISCONNECTED") {
      removeUserChannels(data.content);
    }
  };

  const initWebSocket = (username) => {
    openWebSocketAsync(`ws://localhost:4242/${username}`, onMessageCallback)
      .then(connection => {
        setConnection(connection);
        setLoggedUser(username);
      })
      .catch(err => {
        console.log('unable to start websocket communication ' + err);
      })
  };

  const handleMessageSubmit = message => {
    if (connection == null || connection == undefined) { 
      throw new Error('try to reconnect');
    }
    const message_wrapper = {
      "from": loggedUser,
      "to": currentChannel,
      "content": message
    };
    connection.send(JSON.stringify(message_wrapper));
  };

  return (
    <div id='wu_app'>
      {isUserLogged() ? (
        <>
          <UsersPanel 
            users={extractUsersList()}
            onUserSelect={selectNewCurrentChannel} />
          
          {getCurrentChannelMessages() != undefined ? (
            <ChatRoomPanel
              messages={getCurrentChannelMessages()}
              recipient={currentChannel}
              onMessageSubmit={handleMessageSubmit} />
          ) : (
              <p>Select a connect to start a discussion</p>
          )}
          
        </>
      ) : (
        <LoginForm onLoginAttempt={initWebSocket} />
      )}
    </div>);
}