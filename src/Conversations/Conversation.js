import React, { useEffect, useState } from 'react';
import { getMessages } from '../apiCalls.js';
import MessageContainer from '../Messages/MessageContainer.js';

const Conversation = (props) => {
  const { title, startDate } = props;
  const [messages, setMessages] = useState([]);
  const [showingMessages, setShowingMessages] = useState(false);
  const messageIndicator = messages.e ? 'No messages yet' : 'View Messages';
  const buttonText = showingMessages ? 'Hide Messages' : messageIndicator;

  useEffect(() => {
    getMessages(props.conversationID)
    .then(data => setMessages(data)) 
  }, [])

  return (
    <article>
      <h1>{title}</h1>
      <p>{startDate}</p>
      <button onClick={() => setShowingMessages(!showingMessages)}>
        {buttonText}
      </button>
      {showingMessages && <MessageContainer messages={messages} />}
    </article>
  )
}

export default Conversation;