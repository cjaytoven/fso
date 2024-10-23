import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text} {props.value}{<br/>}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total < 1) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
      <table>
        <tbody>
              <StatisticLine text="good" value={props.good}/>
              <StatisticLine text="neutral"v alue={props.neutral}/>
              <StatisticLine text="bad"v alue={props.bad}/>
              <StatisticLine text="all" value={props.total}/>
              <StatisticLine text="average" value={props.average}/>
              <StatisticLine text="positive" value={props.positive + '%'}/>
        </tbody>
      </table>
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
      <Statistics good={good} neutral={neutral} bad={bad} total={good + neutral + bad} 
        average={(good-bad)/(good+neutral+bad)} positive={(good/(good+neutral+bad)*100)}/>

    </div>
  )
}

export default App