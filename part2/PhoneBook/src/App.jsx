import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from './components/Form'
import Person from './components/Person'
import axios from 'axios'
import phServices from './services/phonebook'
import Notification from "./components/Notification";

const App = () => {

  const [persons, setPersons] = useState([
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    phServices.getAll().then((initialPersons) =>
      setPersons(
        initialPersons.concat({
          name: "roberto",
          number: "212312312",
          id: 233
        })
      )
    );
  },[])
  

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

  const removePerson = (id) => {

    const personToBeDeleted = persons.find((person) => person.id == id)
    const isSure = confirm(`Delete ${personToBeDeleted.name} ?`)
    console.log(isSure);
    

    if (isSure)  { 
    phServices
      .remove(id)
      .then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id != deletedPerson.id))
      }).catch((message) =>{
        console.log(message)
        setError(`${message.code}: ${personToBeDeleted.name} has already been removed`)
        setPersons(persons.filter((person) => person.id != personToBeDeleted.id ))
        setTimeout(() => {
          setError(null)
        }, 5000);


      })
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
      phServices
        .create(newPersonObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setError(`${newPersonObj.name} added to the phonebook`)
          setTimeout(() => {
            setError(null)
          }, 5000);
        }).catch((message) => {
          setError(`${message.code}: ${newPersonObj.name} has already been removed`)
          setTimeout(() => {
            setError(null)
          }, 500);
        })
    }else{
        const isSure = confirm(`update ${newName}'s number?`)

        if (isSure){
          phServices
          .update(found.id, newPersonObj)
          .then((updatedPerson) => {
              setPersons(persons.map((person) => person.id == found.id ? {...person, number: newNumber} : person));
              setNewName("");
              setNewNumber("");
              setError(`${newPersonObj.name}'s number has been updated`)
              setTimeout(() => {
                setError(null)
              }, 5000);
          }).catch((message) => {
            setError(
              `${message.code}: ${newPersonObj.name} has already been removed`
            )
            setTimeout(() => {
              setError(null)
            }, 5000);
          })
        }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error} />
      <Filter value={searchText} onChange={onSearchChange} />
      <h2>Add New</h2>
      <Form
        addName={newName}
        addNumber={newNumber}
        onClickName={onNameChange}
        onClickNumber={onNumberChange}
        onClickbutton={addPerson}
      />
      <h2>Numbers</h2>
      {showPeople.map((person, i) => {
        return (
          <Person
            key={i}
            person={person}
            removePerson={() => removePerson(person.id)}
          />
        );
      })}
    </div>
  );
};

export default App;
