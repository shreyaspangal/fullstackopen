const Persons = ({ contacsToShow }) => {
    return (
        <>
            {!contacsToShow.length ?
                'No match found! - try again with another name.'
                : contacsToShow.map((person) => (
                    <div key={person.id}>{person.name}{" "}{person.number}</div>
                ))}
        </>
    )
}

export default Persons;