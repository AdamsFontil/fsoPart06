import { useQuery, useQueryClient, useMutation} from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'


const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

const updateAnecdoteMutation = useMutation(updateAnecdote, {
  onSuccess: (updatedAnecdote) => {
    queryClient.setQueryData('anecdotes', (oldAnecdotes) =>
      oldAnecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
    );
  },
});


  const handleVote = (anecdote) => {
    const votes = anecdote.votes
    console.log('vote')
    console.log(anecdote)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: votes + 1 })
    dispatch('VOTE', anecdote)
    setTimeout(() => {
      dispatch('CLEAR', anecdote);
    }, 5000);

  }


  const result = useQuery('anecdotes', getAnecdotes,
  {
    retry: 1
  },
  {
    refetchOnWindowFocus: false

  })




  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <span>anecdote service is not available due to problems in server</span>
  }

  const anecdotes = result.data



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
