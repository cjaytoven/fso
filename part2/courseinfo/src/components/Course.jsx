import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => 
    <div>
        <Header header={course.name} />
        <Content content={course.parts} />
        <Total total={course.parts.reduce((total, curr) => total + curr.exercises, 0)} />
    </div>

  
export default Course