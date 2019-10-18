import { createStore, combineReducers } from 'redux';
//combine reducers combines several reducers into a single store, also used to nest a different data-type as a property of the store object
import uuid from 'uuid'
//library that random generates an ID

// ADD_EXPENSE
const addExpense = (
    {
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}
    // parameters, deconstruct the object, default to empty object and assign default values for each of the variables
) => (
    {
        type: 'ADD_EXPENSE',
        // the expense property is commonly referred to as the payload
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    }
);

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    // no default for ID, because the ID is required to remove expense
        type: 'REMOVE_EXPENSE',
        id
});


// EDIT_EXPENSE
const editExpenses = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    // no need to set default to undefined, because an argument with no value is undefined (like a variable)
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    // no need to set default to undefined, because an argument with no value is undefined (like a variable)
    type: 'SET_END_DATE',
    endDate
});

// Expenses Reducer
const expenseReducerDefaultState = [];
//reducer is passed default state and actions object
const expensesReducer = (state = expenseReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
            // since each expense item is an object in the array and the id is stored in expense.id, we can destructure it immediately
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
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

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return { ...state, text: action.text };
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date' };
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount' };
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate };
        case 'SET_END_DATE':
            return { ...state, endDate: action.endDate }
        default:
            return state;
    }
};

//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        //start date is either not a number (no filter applied) or it matches
            //only return the item if it matches the filter or it doesnt have a filter 
            //no filter applied must evaluate to true
        // the result is always a boolean value since comparison operators are beign used
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
            // 1 comes after, -1 comes first - most recent sits at the top
        } else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
};

// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
    //combineReducers enables us to build more complex stores; combineReducers is a function since createStore expects a function
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});
//subscribe watches for store updates, when the store updates it calls the callback function

const expenseOne = store.dispatch(addExpense({description: 'rent', amount: 1000, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({description: 'coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpenses(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
    expenses: [{
        id: 'randobrando',
        description: 'january rent',
        note: 'this was the final payment for that address',
        amount: 54500,
        //sticking with pennies as the value reduces rounding or computational errors
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Jen',
//     age: 24
// }

// console.log({
//     ...user,
//     location: 'Toronto',
//     age: 27
//     // since the age is after the spread, it overrides the age property in user
// })