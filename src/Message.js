import React, { useEffect, useState } from 'react';
import { getThoughts } from './apiCalls.js';
import ThoughtContainer from './ThoughtContainer.js';

const Message = (props) => {
  const { text, dateSent } = props;
  const [thoughts, setThoughts] = useState([]);
  const [showingThoughts, setShowingThoughts] = useState(false);
  const buttonText = showingThoughts ? 'Hide Thoughts' : 'View Thoughts';

  useEffect(() => {
    getThoughts(props.messageID)
    .then(data => setThoughts(data)) 
  }, [])

  return (
    <article>
      <p>{text}</p>
      <p>{dateSent}</p>
      <button onClick={() => setShowingThoughts(!showingThoughts)}>
        {buttonText}
      </button>
      {showingThoughts && <ThoughtContainer thoughts={thoughts} />}
    </article>
  )
}

export default Message;