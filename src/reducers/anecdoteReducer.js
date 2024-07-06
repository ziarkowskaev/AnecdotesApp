import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteForA(state, action) {
      const updatedAnecdote = action.payload;
      return state
        .map((anecdote) => (anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
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

export const {voteForA, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = id => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdoteToChange = state.anecdotes.find(anecdote => anecdote.id === id);
    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    dispatch(voteForA(updatedAnecdote));
    
    await anecdoteService.update(id);
  };
}
export default anecdoteSlice.reducer
