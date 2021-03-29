import React, { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [topIndex, setTopIndex] = useState(0)

  const handleNext = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const handleVote = (selectedAnecdote) => () => {
    const copy = [...votes]
    copy[selectedAnecdote] += 1
    if (copy[selectedAnecdote] > copy[topIndex]) {
      setTopIndex(selectedAnecdote)
    }
    setVotes(copy)
  }


  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]} <br />
      has {votes[selected]} votes <br />
      <Button handleClick={handleVote(selected)} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />

      <Header text="Anecdote with most votes" />
      {anecdotes[topIndex]} <br />
      has {votes[topIndex]} votes <br />
    </div>
  )
}

export default App