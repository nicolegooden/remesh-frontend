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