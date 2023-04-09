import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [message, setMessage] = useState({content: null, type: undefined})

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])
  
  const addContact = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newNumber
    }
    
    const pers = persons.find(p => p.name === nameObj.name)
    
    if (pers) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(pers.id, nameObj)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== pers.id ? p : returnedPerson))
            setMessage(
              {
                content: `Number for ${newName} has been updated`,
                type: 'info'
              }
            )
          })
          .catch(error => {
            setMessage(
              {
                content: `Information of ${pers.name} has already been removed from the server`,
                type: 'error'
              }
            )
          })
        setTimeout(() => {
          setMessage(
            {
              content: null,
              type: undefined
            }
          )
        }, 5000)
        setNewName('')
        setNewNumber('')
      }
    } else {
      personsService
        .create(nameObj)
        .then(personObj => {
          setPersons(persons.concat(personObj))
          setMessage(
            {
              content: `Added ${newName}`,
              type: 'info'
            }
          )
        })
      setTimeout(() => {
        setMessage(
          {
            content: null,
            type: undefined
          }
        )
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
        .remove(person.id)
        .then(personObj => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(
            {
              content: `Deleted ${person.name}`,
              type: 'info'
            }
          )
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(
            {
              content: `Information of ${person.name} has already been removed from the server`,
              type: 'error'
            }
          )
        })
      setTimeout(() => {
        setMessage(
          {
            content: null,
            type: undefined
          }
        )
      }, 5000)
    }
  }

  const contactsToShow = showAll
    ? persons.filter(person => person.name.toLowerCase().includes(showAll))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.content} type={message.type}/>
      <Filter
        showAll={showAll}
        handleFilterChange={handleFilterChange}
      />

      <h3>add a new</h3>

      <PersonForm 
        addNew={addContact} 
        name={newName} 
        number={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers</h3>
      {contactsToShow.map(p =>
        <Persons
          key={p.id}
          person={p}
          removePerson={() => removePerson(p.id)}
        />
      )} 
    </div>
  )

}

export default App