
const Person = ({person, removePerson}) => {
    
    return (
      <p>
        {person.name} {person.number}
        <button onClick={removePerson}>DELETE</button>
      </p>
    );
}


export default Person