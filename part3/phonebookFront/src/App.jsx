import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMessageType, setNotificationMessageType] = useState(null);
  
  useEffect(() => {
    personService
        .getAll()
        .then(initialPerson => {
            setPersons(initialPerson);
        })
  }, [])

  if (!persons){
    return null
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    let message = ''
    
    if (existingPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        message = ` Successfully updated ${newName}'s number`
        setNotificationMessageType('error');
        const updatedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
          })
      }
    }

    else{
      message = `Successfully added ${newName}`
      setNotificationMessageType('success');
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
        })
    }

    setNewName('')
    setNewNumber('')
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleDeletePerson = (id, name) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
      .catch(error => {
        setNotificationMessage(`${name} has already been deleted`)
        setNotificationMessageType('error');
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
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

      <Notification message={notificationMessage}  className={notificationMessageType}/>

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
