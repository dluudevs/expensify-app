import React from 'react';
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expense from '../fixture/expenses'

let wrapper, history, editExpenses, removeExpense;
// must be defined globally so each test case has access. this is to keep code dry

//lifecycle method that runs before each test and defines the variables
beforeEach(() => {
    //must create spies as these functions are to be rendred with EditExpensePage 
    history = { push: jest.fn() }
    editExpenses = jest.fn()
    removeExpense = jest.fn()
    wrapper = shallow(<EditExpensePage history={history} editExpenses={editExpenses} removeExpense={removeExpense} expense={expense[2]}/>)
});

test('should render editExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense[2]) //call the event handler
    //below are the assertions for the event handler
    expect(editExpenses).toHaveBeenLastCalledWith(expense[2].id, expense[2]) 
    expect(history.push).toHaveBeenLastCalledWith('/')
});

test('should handle removeExpense', () => {
    wrapper.find('button').prop('onClick')() //alternatively since nothing is being passed you can simply simulate the event 
    //wrapper.find('button').simulate('onClick')
    expect(removeExpense).toHaveBeenLastCalledWith({id: expense[2].id})
    expect(history.push).toHaveBeenLastCalledWith('/')
});

