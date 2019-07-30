import React from 'react';

const UsersPanel = (props) => { 

    return (
        <div id='wu_users_panel'>
            <div id='wu_users_panel_header'>Connected users</div>

            {props.users.map(user => {
                return (
                    <div key={user.user_id} className='wu_user_entry' onClick={() => props.onUserSelect(user.user_id)}>
                        <img className='wu_profile_pic' src={user.profile_picture} />
                        {user.firstname} {user.lastname}
                    </div>
                );
            })}

        </div>
    );
};

export default UsersPanel;