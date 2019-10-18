import { addExpense, editExpenses, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
    // toBe is basically === this will not work for objects/array
    // use toEqual check for object properties instead 
});

test('should setup edit expense action object', () => {
    const action = editExpenses('123abc', { amount: 4500, description: 'last month rent' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { amount: 4500, description: 'last month rent' }
    })
});

test('should setup add expense action object with provided values', () => {
    const expense = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: "this was last month's rent"
    }
    const action = addExpense(expense)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense, //spread because we want to copy over the properties, there is still a property we have to assert for below. if ID was static we could have just made expense: expense
            id:expect.any(String)
            // since the id is randomly generated each time an expense object is added, can only test that the type is what we expect
        }
    })
});

test('should setup add expense action object with default values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
});