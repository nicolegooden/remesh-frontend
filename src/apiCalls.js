export const getAllConversations = () => {
  return fetch('http://localhost:3000/api/v1/conversations')
  .then(res => res.json())
  .catch(err => console.log(err))
}