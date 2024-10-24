import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas',number: '021-212-2233'},
    { id: 2, name: 'Ada Lovelace',number: '027-027-7765'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }

    else{
      const personObject = {
        id: String(persons.length + 1),
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))

    }
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }
  
  const filterPersons = newFilter ?
    persons.filter(person => person.name.toLowerCase().includes(newFilter)) :
    persons

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>filter <input value={newFilter}
        onChange={handleFilterChange}/></div>
      </form>
      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filterPersons.map(person =>
          <Persons key={person.id} person={person} />
        )}
      </div>
    </div>
    
  )
}

export default App
