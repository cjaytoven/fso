import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from "./components/PersonForm"

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

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add new</h2>

      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons filterPersons={filterPersons} />
      
    </div>
    
  )
}

export default App
