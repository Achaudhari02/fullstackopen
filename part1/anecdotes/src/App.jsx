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

  const [total, setTotal] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])

  const handleClickLeft = () => {
    setAll(allClicks.concat('L'))
    console.log('left before', left)
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    console.log('left after', left)
    setTotal(updatedLeft + right)
  }

  const handleClickRight = () => {
    setAll(allClicks.concat("R"))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      {left}
      <Button onClick={handleClickLeft} text='Left' />
      <Button onClick={handleClickRight} text='right'/>
      {right}
      <History allClicks={allClicks} />
      <div>
        <button onClick={() => console.log(allClicks)}>History</button>
        {total}
      </div>
    </div>
  )
 }


export default App