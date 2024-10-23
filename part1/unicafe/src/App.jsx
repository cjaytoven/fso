import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Stastics = (props) => {
  const count = props.feedbackGood + props.feedbackNeutral + props.feedbackBad
  return(
    <p>
      Good {props.feedbackGood}{<br/>}
      Neutral {props.feedbackNeutral}{<br/>}
      Bad {props.feedbackBad}{<br/>}
      All {count}{<br/>}
      Average {(props.feedbackGood - props.feedbackBad) / count}{<br/>}
      Positive {props.feedbackGood / count * 100}%
    </p>
  )
}

const App = () => {
  const header = 'Give feedback'
  const subHeader = 'Statistics'
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header={header}/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header header={subHeader}/>
      <Stastics feedbackGood={good} feedbackNeutral={neutral} feedbackBad={bad}/>

    </div>
  )
}

export default App