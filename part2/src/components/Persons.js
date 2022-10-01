const Persons = ({ contacsToShow, handleDelete, filter }) => {
    return (
        <>
            {!contacsToShow.length && filter ?
                'No match found! - try again with another name.'
                : !contacsToShow.length ? 'No contacts added yet!'
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