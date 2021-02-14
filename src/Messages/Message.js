import React, { useEffect, useState } from 'react';
import { getThoughts } from '../apiCalls.js';
import ThoughtContainer from '../Thoughts/ThoughtContainer.js';

const Message = (props) => {
  const { text, dateSent, messageID } = props;
  const [thoughts, setThoughts] = useState([]);
  const [showingThoughts, setShowingThoughts] = useState(false);
  const messageIndicator = thoughts.error ? 'Add First Thought' : 'View Thoughts';
  const buttonText = showingThoughts ? 'Hide Thoughts' : messageIndicator;

  useEffect(() => {
    getThoughts(props.messageID)
    .then(data => setThoughts(data)) 
  }, [])

  return (
    <article>
      <h5>{text}</h5>
      <p>{dateSent}</p>
      <button onClick={() => setShowingThoughts(!showingThoughts)}>
        {buttonText}
      </button>
      {showingThoughts && 
        <ThoughtContainer 
          thoughts={thoughts} 
          messageID={messageID}
          setThoughts={setThoughts}
        />
      }
    </article>
  )
}

export default Message;