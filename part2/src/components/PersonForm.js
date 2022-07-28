const PersonForm = ({ PersonFormData: { handleSubmit, newName, setNewName, newNumber, setNewNumber } }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                Name: <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div>
                Number: <input type="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm;