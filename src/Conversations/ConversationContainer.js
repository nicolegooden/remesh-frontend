import React, { useState } from 'react';
import Conversation from './Conversation.js';
import { postConversation } from '../apiCalls.js';

const ConversationsContainer = (props) => {
  const [convSearch, updateSearch] = useState('');
  const [matches, setMatches] = useState([]);
  const [convTitle, setConvTitle] = useState('');
  const [message, setMessage] = useState('');

  let conversations = props.conversations.map(conv => {
    const startDate = conv.start_date.split(' ')[0];
    return (
      <Conversation 
        conversationID={conv.conversation_id}
        startDate={startDate}
        title={conv.title}
        key={conv.conversation_id}
      />
    )
  })

  const trackSearch = (e) => {
    updateSearch(e.target.value);
    // per conversation title 
    // the title needs to include every letter in the convSearch
    const matchingConvs = props.conversations.filter(conv => {
      return conv.title.toLowerCase().includes(convSearch);
    })
    setMatches(matchingConvs.map(match => {
      const startDate = match.start_date.split(' ')[0];
      return (
        <Conversation 
          conversationID={match.conversation_id}
          startDate={startDate}
          title={match.title}
          key={match.conversation_id}
        />
      )  
    }))
  }

  const determineConversations = () => {
    return matches.length > 0 && convSearch !== '' ? matches : conversations;
  }

  const trackTitle = (e) => {
    setConvTitle(e.target.value);
  }

  const submitTitle = async (e) => {
    e.preventDefault();
    const conversation = {
      title: convTitle
    }
    await postConversation(conversation);
    setConvTitle('');
    setMessage('Success!');
  }

  return (
    <section>
      <h1>Let's Start a Conversation...</h1>
      <input 
        placeholder='title' 
        value={convTitle}
        onChange={trackTitle}
      />
      <button onClick={submitTitle}>SUBMIT</button>
      <p>{message}</p>
      <h3>Existing Conversations</h3>
      <input 
        placeholder='search by title...'
        value={convSearch}
        onChange={trackSearch}
      />
      <article>{determineConversations()}</article>
    </section>
  )
}

export default ConversationsContainer;