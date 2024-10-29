const Persons = ({ person, handleDeletePerson }) => {
    return (
      <>
        {person.name} {person.number}
        <button onClick={() => handleDeletePerson(person.id)}>delete</button>
        <br></br>
      </>
    )
  }
  
  export default Persons