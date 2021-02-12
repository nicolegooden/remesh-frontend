import React from 'react';
import Thought from './Thought.js';

const ThoughtContainer = (props) => {
  const { thoughts } = props;
  const thoughtSection = thoughts.map(thought => {
    return (
      <Thought 
        thoughtID={thought.thought_id}
        text={thought.text}
        key={thought.thought_id}
      />
    )
  })

  return (
    <section>{thoughtSection}</section>
  )
}

export default ThoughtContainer;