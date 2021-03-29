import React, { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({name, value}) => 
  <tr> 
    <td>{name}</td> 
    <td>{value}</td> 
  </tr>


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all == 0) {
    return (
      <div>
        <Header text="statistics" />
        No feedback given
      </div>
    )
  }

  const average = (good - bad) / all
  const positive = good / all * 100
  const positiveString = String(positive) + " %"

  return (
    <div>
      <Header text="statistics" />
      <table>
        <tbody>
          <Statistic name="good" value={good} />
          <Statistic name="neutral" value={neutral} />
          <Statistic name="bad" value={bad} />
          <Statistic name="all" value={all} />
          <Statistic name="average" value={average} />
          <Statistic name="positive" value={positiveString} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text="give feedback" />

      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App