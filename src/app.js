import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss'; 
import 'normalize.css/normalize.css'; 
// *** Redux ***
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();
//configureStore returns an object with store methods. it does not hold return the 'state' - to do that you must used the method getStat below

store.dispatch(addExpense({ 
    description: 'Water bill',
    amount: 4500
}));
store.dispatch(addExpense({
    description: 'Gas bill',
    createdAt: 1000
}));
store.dispatch(addExpense({
    description: 'Rent',
    amount: 109500
}));

const state = store.getState();
const expenses = getVisibleExpenses( state.expenses, state.filters );


const jsx = (
    // provider - provides the store object to all the child components. enables the use of connect, connecting the components to the store
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))