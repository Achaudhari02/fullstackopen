import { useState } from "react";
import Filter from "./components/Filter";
import Form from './components/Form'
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([
      { name: "Arto Hellas", number: "040-123456", id: 1 },
      { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
      { name: "Dan Abramov", number: "12-43-234345", id: 3 },
      { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [peopleToShow, setPeopleToShow] = useState(persons) 

  console.log(persons);
  

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onSearchChange = (event) => {
    setSearchText(event.target.value)
    if(searchText != ""){
      setShowAll(false)
    }else{
      setShowAll(true)
    }
  }

  const showPeople = showAll ? persons : persons.filter((person) => person.name.toLowerCase().includes(searchText.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    const found = persons.find((person) => person.name == newName)

    if(!(found)){
      setPersons(persons.concat(newPersonObj));
      setNewName("")
      setNewNumber("")
    }else{
      alert(`${newName} already exist`)
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchText} onChange={onSearchChange} />
      <h2>Add New</h2>
      <Form addName={newName} addNumber={newNumber} onClickName={onNameChange} onClickNumber={onNumberChange} onClickbutton={addPerson}/>
      <h2>Numbers</h2>
      {showPeople.map((person, i) => <Person key={i} person={person}/>)}
    </div>
  );
};

export default App;
