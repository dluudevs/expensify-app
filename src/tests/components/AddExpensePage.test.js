import React from 'react'
import { shallow } from 'enzyme'
import { AddExpensePage } from '../../components/AddExpensePage'
import expenses from '../fixture/expenses'

let addExpense, history, wrapper;
// globally declare variable as they will be re-used in testing

//global method part of jest, will run before each test scenario
beforeEach(() => {
    // purpose of this function is to define the variables used for tests once
    addExpense = jest.fn();
    history = { push: jest.fn() }
    // the above are called spies. they are basically mock functions so that when these handlers are called no error is produced
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />)
    // addExpense is the name of the prop that will be called in the AddExpensePage component
});

test('should render add expense page', () => {
    expect(wrapper).toMatchSnapshot()
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    // access ExpenseForm component and retrieve its prop - which is a function. call the function and pass it the expense data
    // subsequently we can expect the two spies to run as these are nested within the onsubmit handler
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1])
});