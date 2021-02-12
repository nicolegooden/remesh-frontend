import React from 'react';

const ConversationsContainer = (props) => {
  const conversations = props.conversations.map(conv => {
    const startDate = conv.start_date.split('T')[0]
    return (
      <div>
        <p>{conv.title}</p>
        <p>{startDate}</p>
      </div>
    )
  })
  return (
    <section>
      <h1>Let's Start a Conversation...</h1>
      <input placeholder='title' />
      <button>SUBMIT</button>
      <h3>Existing Conversations</h3>
      <input placeholder='search by title...'/>
      <article>{conversations}</article>
    </section>
  )
}

export default ConversationsContainer;