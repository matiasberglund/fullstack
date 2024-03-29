import { useState } from 'react'

const Display = (props) => {
  return (
    <>
      <h1>{props.h1}</h1>
      <p>{props.list[props.anecdote]}</p>
      <p>has {props.vote} votes</p>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.name}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const randomNumber = (list) => {
    return Math.floor(Math.random() * list.length)
  }
   
  const points = new Uint8Array(anecdotes.length)
  const copy = [...points]

  const [selected, setSelected] = useState(randomNumber(anecdotes))
  const [votes, setVotes] = useState(copy)
  
  const inc = (n) => {
    votes[n] += 1
    return votes
  }

  const max = Math.max(...votes)
  const i = votes.indexOf(max)

  return (
    <div>
      <Display h1="Anecdote of the day" anecdote={selected} list={anecdotes} vote={votes[selected]}/>
      <Button name="vote" handleClick={() => setVotes(inc(selected))}/>
      <Button name="next anecdote" handleClick={() => setSelected(randomNumber(anecdotes))}/>
      <Display h1="Anecdote with most votes" anecdote={i} list={anecdotes} vote={max}/>
    </div>
  )
}

export default App