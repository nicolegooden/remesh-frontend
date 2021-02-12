import React, { useState } from 'react';
import Message from './Message.js';

const MessageContainer = (props) => {
  const { messages } = props;
  const messageSection = messages.map(message => {
    return (
      <Message 
        messageID={message.message_id}
        text={message.text}
        key={message.message_id}
      /> 
    )
  })

  return (
    <section>{messageSection}</section>
  )
}

export default MessageContainer;