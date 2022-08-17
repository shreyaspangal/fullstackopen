const Persons = ({ contacsToShow, handleDelete }) => {
    return (
        <>
            {!contacsToShow.length ?
                'No match found! - try again with another name.'
                : contacsToShow.map((person) => (
                    <p key={person.id}>
                        <span>{person.name}{" "}{person.number}</span> &nbsp;
                        <button onClick={() => handleDelete(person)}>Delete</button>
                    </p>
                ))}
        </>
    )
}

export default Persons;