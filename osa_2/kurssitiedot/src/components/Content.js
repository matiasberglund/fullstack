import Part from "./Part"

const Content = (props) => {
    const result = props.parts.reduce((total, currentValue) => total = total + currentValue.exercises,0);
    return (
      <>
        {props.parts.map(part =>
            <Part key={part.id} part={part.name} exercise={part.exercises} />
        )}
        <h3>total of {result} exercises</h3>
      </>
    )
}

export default Content