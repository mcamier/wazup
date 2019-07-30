import React, { useEffect, useState } from 'react';
import openWebSocketAsync  from '../utils/webSocketPromise';

import ChatRoomPanel from './ChatRoomPanel';
import LoginForm from './LoginScreen';
import UsersPanel from './UsersPanel';

const mockChannels = {
  'sgonzalez': {
    'user_details': {
      'user_id': 'sgonzalez',
      'firstname': 'Sonia',
      'lastname': 'Gonzalez',
      'profile_picture':
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    'messages': [
      {'content': 'Coucou mon coeur', 'from_you': true},
      {'content': 'comment ca va', 'from_you': false},
      {'content': 'bien et toi', 'from_you': true},
      {'content': 'bien mais tu me manques, je t\'aime', 'from_you': false},
      {'content': 'moi aussi doudi', 'from_you': true},
    ]
  },
  'rgonzalez': {
    'user_details': {
      'user_id': 'rgonzalez',
      'firstname': 'Raul',
      'lastname': 'Gonzalez',
      'profile_picture':
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    'messages': [{'content': 'Allo?', 'from_you': true}]
  },
  'amillois': {
    'user_details': {
      'user_id': 'amillois',
      'firstname': 'Alexis',
      'lastname': 'Millois',
      'profile_picture':
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    'messages': [
      {'content': 'Salut xixi, ca va ?', 'from_you': true},
      {'content': 'oui', 'from_you': false}, {
        'content': 'on se fait une petite partie de counter strike GO ??',
        'from_you': true
      },
      {'content': 'Allez ok', 'from_you': false},
      {'content': 'go discord alors', 'from_you': true}
    ]
  },
  'afoobar': {
    'user_details': {
      'user_id': 'afoobar',
      'firstname': 'Alice',
      'lastname': 'Foobar',
      'profile_picture':
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    'messages': []
  },
  'bfoobar': {
    'user_details': {
      'user_id': 'bfoobar',
      'firstname': 'Bob',
      'lastname': 'Foobar',
      'profile_picture':
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    'messages': []
  }
};

export default function App() {
  let connection;
  const [loggedUser, setLoggedUser] = useState(null);
  const [channels, setChannels] = useState(mockChannels);
  const [currentChannel, setCurrentChannel] = useState(mockChannels['amillois']);

  const selectNewCurrentChannel = user_id => setCurrentChannel(channels[user_id]);

  const extractUsersList = () => Object.values(channels).map(values => values.user_details);
  const isUserLogged = () => loggedUser !== null && loggedUser !== undefined;

  const onMessageCallback = (message) => console.log(message);

  const initWebSocket = (username) => {
    openWebSocketAsync(`ws://localhost:4242/${mcamier}`, onMessageCallback)
      .then(conn => { 
        connection = conn;
        setLoggedUser(username);
      })
      .catch(err => { 
        console.log('unable to start websocket communication ' + err);
      })
  };

  return (
      <div id='wu_app'>
          {isUserLogged() ? (
            <>
              <UsersPanel 
                users={extractUsersList()}
                onUserSelect={selectNewCurrentChannel} />
              <ChatRoomPanel
                messages={currentChannel.messages}
                recipient={currentChannel.user_details} />
            </>
          ) : (
            <LoginForm onLoginAttempt={initWebSocket} />
          )}
      </div>);
}