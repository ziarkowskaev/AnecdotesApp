import { useSelector, useDispatch } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((a) => a && a.content && a.content.toLowerCase().includes(state.filter.toLowerCase()));
  });

  const dispatch = useDispatch();

  const vote = async (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(
      showNotification(
        `You voted '${anecdotes.find((a) => a.id === id).content}'`, 10
      ),
    )
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AnecdoteList;
