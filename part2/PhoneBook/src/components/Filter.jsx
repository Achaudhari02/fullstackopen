

const Filter = (props) => {
    
    return (
      <div>
        Search for:{" "}
        <input value={props.value} onChange={props.onChange}></input>
      </div>
    );
}

export default Filter