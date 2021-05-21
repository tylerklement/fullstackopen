import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import People from './components/People'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)
  const [ alertMessageColor, setAlertMessageColor ] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const setAlertMessageWithTimeout = (message, color) => {
    setAlertMessage(
      message
    )
    setAlertMessageColor(color)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)

  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObj = {name: newName, number: newNumber}

    if(persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personId = persons.filter(person => person.name === newName)[0].id
        const newPersonObj = {"id": personId, ...personObj}

        personService
          .update(newPersonObj)
          .then(returnedPerson => {
            setPersons(persons.filter(person => person.name !== returnedPerson.name).concat(returnedPerson))
            setAlertMessageWithTimeout(`Updated ${returnedPerson.name}`, 'green')
          }).catch(error => 
            setAlertMessageWithTimeout(`Information of ${newPersonObj.name} has already been removed from server`, 'red')
          )
      }
    } else {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setAlertMessageWithTimeout(`Added ${returnedPerson.name}`, 'green')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleDelete = (deletedPerson) => (event) => {
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      personService
      .deleteEntry(deletedPerson.id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => deletedPerson.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} notificationColor={alertMessageColor} />
      <Filter onChangeHandler={handleFilterChange} />

      <h2>add a new</h2> 
      <AddPersonForm submitHandler={addPerson} 
                  nameChangeHandler={handleNameChange} 
                  numberChangeHandler={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <People persons={persons} newFilter={newFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App