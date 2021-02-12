import React from 'react';
import Thought from './Thought.js';

const ThoughtContainer = (props) => {
  const { thoughts } = props;
  const thoughtSection = thoughts.map(thought => {
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

  return (
    <section>{thoughtSection}</section>
  )
}

export default ThoughtContainer;