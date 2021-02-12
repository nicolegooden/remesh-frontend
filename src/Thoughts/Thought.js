import React from 'react';

const Thought = (props) => {
  const { text, dateSent } = props;
  return (
    <article>
      <p>{text}</p>
      <p>{dateSent}</p>
    </article>
  )
}

export default Thought;