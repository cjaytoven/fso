const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => {
    return (
      <>
        <h1>{props.header}</h1>
      </>
    )
  }

  const Content = (props) => {
    return(
      <>
        <p>{props.course} {props.exercises}</p>
      </>
    )
  }

  const Total = (props) => {
    return(
      <>
        <p>Number of exercises {props.total}</p>
      </>
    )
  }



  return (
    <div>
      <Header header={course}/>
      <Content course={part1} exercises={exercises1}/>
      <Content course={part2} exercises={exercises2}/>
      <Content course={part3} exercises={exercises3}/>
      <Total total={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App
