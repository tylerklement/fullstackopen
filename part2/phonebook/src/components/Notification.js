import React from 'react'

const Notification = ({ message, notificationColor }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: notificationColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  
  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification