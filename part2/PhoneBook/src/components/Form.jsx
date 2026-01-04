

const Form = (props) => {
    return (
      <form>
        <div>
          name: <input value={props.addName} onChange={props.onClickName} />
        </div>
        <div>
          number:{" "}
          <input value={props.addNumber} onChange={props.onClickNumber}></input>
        </div>
        <div>
          <button type="submit" onClick={props.onClickbutton}>
            add
          </button>
        </div>
      </form>
    );
}


export default Form