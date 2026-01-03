import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Header = ({text}) => <p>{text}</p>

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const anecdotesLen = anecdotes.length
  const array = new Array(anecdotesLen).fill(0)
  const [votes, setVotes] = useState(array);
  let max = 0
  let index = 0

  for(let i = 0; i < anecdotesLen; i++){
    if (votes[i] >= max) {
      max = votes[i]
      index = i
    }
  }



  const randomSelect = () => {

    const random = Math.floor(Math.random() * anecdotesLen)
    setSelected(random)

  }

  const addVote = (votes) => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    console.log(votesCopy)
    setVotes(votesCopy)
  }

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={randomSelect} text="next anecdote" />
      <Button onClick={() => addVote(votes)} text="vote"/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
    </div>
  );
};

export default App;
