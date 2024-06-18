import { createSlice } from "@reduxjs/toolkit"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push(content)
    },
    voteForA(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteForA, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
