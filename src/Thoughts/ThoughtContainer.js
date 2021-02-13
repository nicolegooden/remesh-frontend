import React, { useState } from 'react';
import Thought from './Thought.js';
import { postThought, getThoughts } from '../apiCalls.js';

const ThoughtContainer = (props) => {
  const { thoughts, messageID, setThoughts } = props;
  const [thoughtText, setText] = useState('');

  const thoughtSection = () => { 
    if (thoughts.length > 0) {
      return thoughts.map(thought => {
        const dateSent = thought.date_sent.split('T')[0];
        return (
          <Thought 
            thoughtID={thought.thought_id}
            text={thought.text}
            key={thought.thought_id}
            dateSent={dateSent}
          />
        )
      })
    }
  }

  const trackText = (e) => {
    setText(e.target.value);
  }

  const submitThought = async (e) => {
    e.preventDefault();
    const thought = {
      text: thoughtText
    }
    await postThought(thought, messageID);
    getThoughts(props.messageID)
    .then(data => setThoughts(data)) 
    setText('');
  }

  return (
    <section>
      <input 
        placeholder='thought' 
        value={thoughtText}
        onChange={trackText}
      />
      <button onClick={submitThought}>ADD</button>
      {thoughtSection()}
    </section>
  )
}

export default ThoughtContainer;