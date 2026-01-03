import { useActionState, useState, useTransition } from "react"



const History = ({allClicks}) => {
  if (allClicks.length === 0){
    return (
      <div>
        <p>The app is used by clicking the buttons</p>
      </div>
    )
  }else {
    return (
      <div>
        <p>{allClicks.join(" ")}</p>
      </div>
    )
    }
}

const Button = (props) => {
  console.log(props)
  const {onClick, text} = props

  return <button onClick={onClick}>{text}</button>;
}





const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => () => console.log('hell', who)
  const newValue = (newVal) => () => setValue(newVal)

  

  return (
    <div>
      {value}
      <button onClick={hello('Raban')}>Button</button>
      <button onClick={newValue(value + 1)}>Button2</button>
    </div>
  )
 }


export default App