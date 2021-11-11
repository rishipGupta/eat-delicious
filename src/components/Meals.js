import React from 'react'

function trimString(str, lengthToTrim) {
    return str.length > lengthToTrim
        ? str.slice(0, lengthToTrim) + '...'
        : str
}

const Meals = ({ meal, onSelect }) => {
    if (meal.length === 0) {
        return <p>No results found.</p>
    }
    return (
        <ul className='food-list'>
            {meal.map((item) => (
                <li onClick={() => onSelect(item)} key={item.label}>
                    <h3 title={item.label}>{trimString(item.label, 15)}</h3>
                    <img src={item.image} alt={item.label} />
                    <div>{Math.floor(item.calories)} Calories</div>
                    <div>{item.source}</div>
                </li>
            ))}
        </ul>
    )
}

export default Meals;