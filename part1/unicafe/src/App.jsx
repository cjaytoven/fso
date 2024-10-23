import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <>
      {props.text} {props.value}{<br/>}
    </>
  )
}

const Stastics = (props) => {
  const count = props.feedbackGood + props.feedbackNeutral + props.feedbackBad
  if (count > 0) return(
    <div>
      <StatisticLine text="Good" value ={props.feedbackGood}/>
      <StatisticLine text="Neutral" value ={props.feedbackNeutral}/>
      <StatisticLine text="Bad" value ={props.feedbackBad}/>
      <StatisticLine text="All" value ={props.count}/>
      <StatisticLine text="Average" value ={(props.feedbackGood - props.feedbackBad) / count}/>
      <StatisticLine text="Positive" value ={props.feedbackGood / count * 100 + '%'}/>
    </div>
  )
  return(
    <p>
      No feedback given
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