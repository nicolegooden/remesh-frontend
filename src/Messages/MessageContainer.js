import React, { useState } from 'react';
import Message from './Message.js';
import { postMessage, getMessages } from '../apiCalls.js';

const MessageContainer = (props) => {
  const { messages, conversationID, setMessages } = props;
  const [messageText, setText] = useState('');

  const messageSection = () => {
    if (messages.length > 0) {
    return messages.map(message => {
      const dateSent = message.date_sent.split('T')[0];
      return (
        <Message 
          messageID={message.message_id}
          text={message.text}
          key={message.message_id}
          dateSent={dateSent}
        /> 
      )
    })
  }}

  const trackText = (e) => {
    setText(e.target.value);
  }

  const submitMessage = async (e) => {
    e.preventDefault();
    const message = {
      text: messageText
    }
    await postMessage(message, conversationID);
    getMessages(props.conversationID)
    .then(data => setMessages(data)) 
    setText('');
  }

  return (
    <section>
      <input 
        placeholder='message' 
        value={messageText}
        onChange={trackText}
      />
      <button onClick={submitMessage}>ADD</button>
      {messageSection()}
    </section>
  )
}

export default MessageContainer;