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