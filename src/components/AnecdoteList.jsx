import { useSelector, useDispatch } from "react-redux"
import { voteForA } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase()),
    );
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteForA(id))
    dispatch(
      setNotification(
        `You voted '${anecdotes.find((a) => a.id === id).content}'`,
      ),
    );
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
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
