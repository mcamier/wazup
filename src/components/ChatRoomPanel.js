import React from 'react';

const ChatRoomPanel = (props) => { 

    return (
        <div id='wu_chatroom_panel'>
            <div id='wu_chatroom_panel_header'>Chat with {props.recipient.firstname} {props.recipient.lastname}</div>

            <div id='wu_chatroom_messages'>

                {props.messages.map(message => {
                    return (
                        <div className={'wu_chatroom_message' + (message.from_you ? ' you' :  '')}>
                            <div>{message.content}</div>
                        </div>
                    );
                })}
            
            </div>

            <div id='wu_chatroom_send_form'>
                <form>
                    <input type='text' placeholder='type your message' />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatRoomPanel;