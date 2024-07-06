import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {

  const anecdoteToUpdate = await axios.get(`${baseUrl}/${id}`);
  const updatedAnecdote = {
    ...anecdoteToUpdate.data,
    votes: anecdoteToUpdate.data.votes + 1
  };
  await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  
}

export default {
  getAll,
  createNew,
  update
}