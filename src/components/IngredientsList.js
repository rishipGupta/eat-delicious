import React from 'react'

const IngredientsList = ({ list, mealNames }) => {
    return (
        <div className='ingredients-list'>
            <h3 className='subheader'>
                Ingredients List
            </h3>
            <ul>
                {/* {mealNames.join(",")} */}
                {list.map((item) => (
                    <li key={item}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default IngredientsList