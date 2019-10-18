import expensesReducer from '../../reducers/expenses'
import expenses from '../fixture/expenses'
import moment from 'moment'

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([
        expenses[0],
        expenses[2]
    ])
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 23
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
});

//should add an expense
const expense = {
    id: 4,
    description: 'utilities bill',
    note: '',
    amount: 25000,
    createdAt: moment()
};

const updates = {
    amount: 12345,
    description: 'happy money'
};

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
});

//should edit an expense
test('should edit an expense', () => {
    const currentExpenses = [ ...expenses, expense ]
    const action = {
        type: 'EDIT_EXPENSE',
        id: 4,
        updates
    }
    const state = expensesReducer(currentExpenses, action)
    expect(state).toEqual([
        ...expenses, { ...expense, ...updates }
        // if you include a duplicate property in the object the original one will get overwritten
        // the above includes all items from the default state, the added expense overwritten with the new properties
    ])
    // OR
    // expect(state[3].amount).toBe(amount) - assuming you only edit the amount - the above is more useful for overwriting
});

//should not edit expnse if expense not found
test('should not edit expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 5,
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
});