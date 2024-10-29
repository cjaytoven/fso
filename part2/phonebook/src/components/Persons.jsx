import Person from './Person'

const Persons = ({filterPersons, handleDeletePerson}) => {
    return (
      <div>
        {filterPersons?.map(person =>
          <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson} />
        )}
      </div>
    )
  }
  
  export default Persons