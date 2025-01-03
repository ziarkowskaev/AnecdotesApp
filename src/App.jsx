import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient,useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import {useNotificationDispatch} from './NotificationContex'
const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote, 
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: { message: `anecdote '${updatedAnecdote.content}' voted`}
      });
    },
    
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes+1})
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  // console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if (result.isError){
    return <span>Error: {result.error.message}</span>
  }

  const anecdotes = result.data

  return (
    <div className="main">
      <h3>Anecdote App</h3>
      
      <Notification />
      <AnecdoteForm />
      
      {anecdotes.map(anecdote => (
        <div key={anecdote.id} className="anecdote">
          <div style={{fontWeight:"bold"}}>{anecdote.content}</div>
          <div>
            Has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default App
