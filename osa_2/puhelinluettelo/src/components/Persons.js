const Persons = ({ person, removePerson }) => {
    return (
        <p key={person.name}>{person.name} {person.number} <button onClick={removePerson}>delete</button></p>
    )
}

export default Persons