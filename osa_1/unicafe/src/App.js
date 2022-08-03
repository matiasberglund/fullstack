import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return(
    <tbody>
      <tr>
        <th style={{textAlign:"left"}}>{props.text}</th>
        <th style={{textAlign:"left"}}>{props.data}</th>
      </tr>
    </tbody>
  )
}

const Statistics = ({props}) => {
  return(
    <table>
      <StatisticLine text="good" data={props[0]} />
      <StatisticLine text="neutral" data={props[1]} />
      <StatisticLine text="bad" data={props[2]} />
      <StatisticLine text="all" data={props[3]} />
      <StatisticLine text="average" data={props[4]} />
      <StatisticLine text="positive" data={props[5]} />
    </table>   
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good - bad) / (good + neutral + bad)
  }

  const positive = () => {
    return good / (good + neutral + bad) * 100 + ' %'
  }

  const feedbackGiven = () => {
    if (all() !== 0)
      return(
        <>
          <Statistics props={[good, neutral, bad, all(), average(), positive()]} />
        </>
      )
    else
      return(
        <p>No feedback given</p>
      )
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics"/>
      {feedbackGiven()}
    </div>
  )
}

export default App