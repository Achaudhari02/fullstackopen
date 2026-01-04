
const Header = (props) => <h2>{props.course}</h2>;

const Content = ({course}) => {
    console.log("Content", course);
    
    return (
      <div>
        {course.parts.map((part) => {
          return <Part key={part.id} part={part} />;
        })}
      </div>
    );
};


const Part = (props) => {
    console.log('part', props);
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
    
};

const Total = (props) => {
    
    let total = props.parts.reduce((sum,part) => sum + part.exercises, 0)
    return <h4>Number of exercises {total}</h4>;
};

const Course = (props) => {
    
    console.log(props);
    
    return (
      <>
        <div>
          <Header course={props.course.name} />
          <Content course={props.course} />
          <Total parts={props.course.parts} />
        </div>
      </>
    );
};


export default Course