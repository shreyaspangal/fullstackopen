const PersonForm = ({ PersonFormData: { handleSubmit, newName, setNewName, newNumber, setNewNumber } }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <span className="inline-block w-32">Name:</span> <input type="text"
                    value={newName} onChange={(e) => setNewName(e.target.value)}
                    className="border-solid border-2 border-sky-500 rounded placeholder-shown:border-gray-500 px-2" placeholder="Add name..." />
            </div>
            <div className="mb-2">
                <span className="inline-block w-32">Number:</span> <input type="text"
                    value={newNumber} onChange={(e) => setNewNumber(e.target.value)}
                    className="border-solid border-2 border-sky-500 rounded placeholder-shown:border-gray-500 px-2" placeholder="Add number..." />
            </div>
            <div className="text-right">
                <button type="submit" className="border-solid border-2 rounded border-green-300 hover:bg-green-500 hover:text-white px-3 active:bg-green-300">Add</button>
            </div>
        </form>
    )
}

export default PersonForm;