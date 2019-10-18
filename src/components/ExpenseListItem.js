import React from 'react';
import { Link } from 'react-router-dom'

// since the expense object was passed (not as a prop) any other props that are received must also be destrucutred (dispatch)
const ExpenseListItem = ({ description, amount, createdAt, id  }) => {
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <h3>Description: {description}</h3>
            </Link>
            <p>{amount} - {createdAt}</p>
        </div>
    )
}

export default ExpenseListItem;

    
    