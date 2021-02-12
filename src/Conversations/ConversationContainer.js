import React, { useState } from 'react';
import Conversation from './Conversation.js';

const ConversationsContainer = (props) => {
 
  const conversations = props.conversations.map(conv => {
    const startDate = conv.start_date.split('T')[0];
    return (
      <Conversation 
        conversationID={conv.conversation_id}
        startDate={startDate}
        title={conv.title}
        key={conv.conversation_id}
      />
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