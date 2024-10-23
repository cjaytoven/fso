import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>;

const Anecdote = ({ text, voteCount }) => {
  return (
    <div>
      <p>
        {text} <br></br>
        has {voteCount} votes
      </p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0)
  const mostPoints = Math.max(...points);
  const mostPointsIndex = points.indexOf(mostPoints);


  return (
    <div>
      <Header header="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} voteCount={points[selected]} />
      <Button handleClick={() => {
        let pointsCopy = [...points]
        pointsCopy[selected] += 1
        setPoints(pointsCopy)
      }} text="Vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Next anecdote" />
      <Header header="Anecdote with the most votes" />
      <Anecdote text={anecdotes[mostPointsIndex]} voteCount={mostPoints} />
    </div>
  )
}

export default App