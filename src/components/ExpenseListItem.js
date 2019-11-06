import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral'

// since the expense object was passed (not as a prop) any other props that are received must also be destrucutred (dispatch)
const ExpenseListItem = ({ description, amount, createdAt, id  }) => {
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <h3>Description: {description}</h3>
            </Link>
            <p>
                {numeral(amount / 100).format('$0,0.00')} 
                - 
                {moment(createdAt).format('MMMM Do, YYYY')}
            </p>
        </div>
    )
}

export default ExpenseListItem;

    
    