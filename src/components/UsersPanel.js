import React from 'react';

const UsersPanel = (props) => { 
  return (
    <div id='wu_users_panel'>
      <div id='wu_users_panel_header'>{props.users.length} users connected</div>
        {props.users.map(user => {
          return (
            <div key={user} className='wu_user_entry' onClick={() => props.onUserSelect(user)}>
              <img className='wu_profile_pic' src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' />
              {user}
            </div>
          );
        })}
    </div>
  );
};

export default UsersPanel;