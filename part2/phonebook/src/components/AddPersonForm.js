import React from 'react'

const AddPersonForm = ({submitHandler, nameChangeHandler, numberChangeHandler}) => 
  <form onSubmit={submitHandler}>
    <div>
      name: <input 
              onChange={nameChangeHandler} 
            />
      number: <input 
              onChange={numberChangeHandler} 
            />
    </div>
    <div>
      <button 
        type="submit"
      >add</button>
    </div>
  </form>

export default AddPersonForm