import { useDebugValue } from "react";
import { useState } from "react";

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)


  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setScore(score + 1)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + bad + good) 
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
    setScore(score - 1)
  }

  const getPositivePercent = () => {
    const percent = (good / total) * 100
    return `${percent}%`
  }

  if(total === 0){
    return (
      <>
        <div>
          <Header text="give feedback" />
        </div>
        <div>
          <Button onClick={handleGood} text="good" />
          <Button onClick={handleNeutral} text="neutral" />
          <Button onClick={handleBad} text="bad" />
        </div>
        <Header text="statistics" />
        <p>No feedback given</p>
      </>
    );
  }
  
   

  return (
    <>
      <div>
        <Header text="give feedback" />
      </div>
      <div>
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
      </div>
      <Header text="statistics" />

      <table>
        <tbody>
          <Statistics text="good" value={good} />
          <Statistics text="neutral" value={neutral} />
          <Statistics text="bad" value={bad} />
          <Statistics text="all" value={total} />
          <Statistics text="average" value={score / total} />
          <Statistics text="positive" value={getPositivePercent()} />
        </tbody>
      </table>
    </>
  );
}

export default App