const Persons = ({ contacsToShow, handleDelete, filter }) => {
    return (
        <>
            {!contacsToShow.length && filter ?
                'No match found! - try again with another name.'
                : !contacsToShow.length ? 'No contacts added yet!'
                    : contacsToShow.map((person) => (
                        <div key={person.id} className="flex justify-between mb-3 hover:bg-slate-100 w-100">
                            <div>
                                <span className="inline-block mr-2">
                                    {contacsToShow.indexOf(person) + 1}.
                                </span>
                                <span className="inline-block">{person.name}{" "}
                                    {person.number}
                                </span>
                            </div>
                            <button onClick={() => handleDelete(person)}
                                className="border-solid border-2 border rounded border-red-400 hover:bg-red-500 hover:text-white px-2 active:bg-red-300 ">Delete
                            </button>
                        </div>
                    ))}
        </>
    )
}

export default Persons;