import uuid from 'uuid';


// ADD_EXPENSE
export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
    // parameters, destructure the object and keep property name if values are provided, assign default values for each of the variables where values are not provided, and default to empty object if nothing is provided
) => ({
    type: 'ADD_EXPENSE',
    // the expense property is commonly referred to as the payload
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => {
    return ({
        // no default for ID, because the ID is required to remove expense
        type: 'REMOVE_EXPENSE',
        id
    })
};


// EDIT_EXPENSE
export const editExpenses = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

