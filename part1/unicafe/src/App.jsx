import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Feedback = (props) => {
  return(
    <p>
      Good {props.feedbackGood}{<br/>}
      Neutral {props.feedbackNeutral}{<br/>}
      Bad {props.feedbackBad}
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
      <Feedback feedbackGood={good} feedbackNeutral={neutral} feedbackBad={bad}/>

    </div>
  )
}

export default App