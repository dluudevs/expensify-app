// Expenses Reducer
const expenseReducerDefaultState = [];
//reducer is passed default state and actions object

// **the below also works for exporting, but i prefer writing at the bottom
// export default = (state = expenseReducerDefaultState, action) => 
const expensesReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        // since each expense item is an object in the array and the id is stored in expense.id, we can destructure it immediately
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                    //take all the properties from the object
                    //and spread the new object's properties (assuming there is more than one) - this will override if the same property exists in the action.updates object
                } else {
                    return expense;
                }
            })
        default:
            return state;
    }
};

export default expensesReducer;