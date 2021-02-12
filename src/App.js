import React, { useEffect, useState } from 'react';
import ConversationContainer from './ConversationContainer.js';
import { getAllConversations } from './apiCalls.js';

const App = (props) => {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getAllConversations()
    .then(data => setConversations(data))
  })

  return (
    <main className="app">
      <h1>Welcome to Remesh</h1>
      <ConversationContainer conversations={conversations} />
    </main>
  );
}

export default App;
