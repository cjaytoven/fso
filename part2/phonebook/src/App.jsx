import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

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
      personService
        .create(personObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
        })

    }
  }

  const handleDeletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
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

      <Persons filterPersons={filterPersons} handleDeletePerson={handleDeletePerson} />
      
    </div>
    
  )
}

export default App
