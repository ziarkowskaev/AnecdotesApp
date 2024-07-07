
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {createAnecdote} from '../requests'
import {useNotificationDispatch} from '../NotificationContex'
const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch();

    const newAnecdoteMutation = useMutation({
      mutationFn: createAnecdote,
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
        queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
        dispatchNotification({
          type: 'SET_NOTIFICATION',
          payload: { message: `anecdote '${newAnecdote.content}' created`}
        });
      },
      onError: (error) => {
        dispatchNotification({
          type: 'SET_NOTIFICATION',
          payload: { message: `${error.response.data.error}`}
        });
      }

    })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
