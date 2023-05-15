import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      console.log('castingVote')
      const updatedAnecdote = action.payload
      const anecdoteIndex = state.findIndex(n => n.id === updatedAnecdote.id)
      state[anecdoteIndex] = { ...updatedAnecdote }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const changeVote = (anecdote) => {
  return async dispatch => {
    const updateVote = await anecdoteService.updateVote(anecdote)
    console.log('updateVote',updateVote)
    dispatch(increaseVote(updateVote))
  }
}

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

export const { increaseVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
