import React from 'react'


const Person = ({person, handleDelete}) => 
  <div>{person.name} {person.number} <button onClick={handleDelete(person)}>delete</button> <br /></div>

const People = ({persons, newFilter, handleDelete}) => 
{
  return persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  ).map(person => 
    <Person key={person.name} person={person} handleDelete={handleDelete}/>
  )
}

export default People