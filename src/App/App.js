import React, { useEffect, useState } from 'react';
import ConversationContainer from '../Conversations/ConversationContainer.js';
import { getAllConversations } from '../apiCalls.js';
import { Route } from 'react-router-dom';

const App = (props) => {
  const [conversations, setConversations] = useState([]);
  
  useEffect(() => {
    getAllConversations()
    .then(data => setConversations(data))
  })

  return (
    <main className="app">
      <h1>Welcome to Remesh</h1>
      <Route exact path='/'>
        <ConversationContainer conversations={conversations} />
      </Route>
    </main>
  );
}

export default App;
