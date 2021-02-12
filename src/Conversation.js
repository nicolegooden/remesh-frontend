import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { getMessages } from './apiCalls.js';
import MessageContainer from './MessageContainer.js';

const Conversation = (props) => {
  const { title, startDate } = props;
  const [messages, setMessages] = useState([]);
  const [showingMessages, setShowingMessages] = useState(false);
  const buttonText = showingMessages ? 'Hide Messages' : 'View Messages'

  useEffect(() => {
    getMessages(props.conversationID)
    .then(data => setMessages(data)) 
  }, [])

  return (
    <article>
      <p>{title}</p>
      <p>{startDate}</p>
      <button onClick={() => setShowingMessages(!showingMessages)}>
        {buttonText}
      </button>
      {showingMessages && <MessageContainer messages={messages} />}
    </article>
  )
}

export default Conversation;