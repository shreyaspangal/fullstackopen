import React from 'react';

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            <span className='inline-block w-32'>Filter:</span> <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-solid border-2 border-sky-500 rounded placeholder-shown:border-gray-500 
                px-2" placeholder="Filter by name or number..." />
        </div>
    )
}

export default Filter;