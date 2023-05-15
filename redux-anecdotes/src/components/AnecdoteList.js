import { useSelector, useDispatch } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    console.log('anecdoteList',state)
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter));
  })

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content} has {anecdote.votes}
            <button onClick={() => {
  dispatch(changeVote(anecdote));
  dispatch(setNotification(`you voted'${anecdote.content}'`, 10));
}}>vote</button>

          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
