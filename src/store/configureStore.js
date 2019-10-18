import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters'

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        //combineReducers enables us to build more complex stores; combineReducers is a function since createStore expects a function
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        //access to redux in dev tools
    );

    return store;
}
