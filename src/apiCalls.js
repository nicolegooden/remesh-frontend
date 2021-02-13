export const getAllConversations = () => {
  return fetch('http://localhost:3000/api/v1/conversations')
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getMessages = (conversation) => {
  return fetch(`http://localhost:3000/api/v1/messages/${conversation}`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getThoughts = (message) => {
  return fetch(`http://localhost:3000/api/v1/thoughts/${message}`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const postConversation = (conversation) => {
  return fetch('http://localhost:3000/api/v1/conversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(conversation)
  })
  .then(res => res.json())
  .catch(e => console.log(e))
}

export const postMessage = (message, conversation) => {
  return fetch(`http://localhost:3000/api/v1/messages/${conversation}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
  .then(res => res.json())
  .catch(e => console.log(e))
}

export const postThought = (thought, message) => {
  return fetch(`http://localhost:3000/api/v1/thoughts/${message}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(thought)
  })
  .then(res => res.json())
  .catch(e => console.log(e))
}