import React, {useState} from 'react';

const LoginScreen = (props) => { 
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLoginAttempt(username);
    };

    return (
        <div id='wu_login_screen'>
            <form onSubmit={handleSubmit}>
                <h1>Wazup !</h1>
                <p>You must be logged in to chat</p>
                <input
                    required placeholder="username" type="text"
                    value={username} onChange={event => setUsername(event.target.value)} />
                <button type='submit'>Connect</button>
            </form>
            
        </div>
    );
};

export default LoginScreen;