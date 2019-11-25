import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixture/expenses'

test('should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]) //test case
    expect(res).toBe(0) //assertion
})

test('should correctly add up a single expense', () => {
    const res = selectExpensesTotal([expenses[0]])
    expect(res).toBe(195)
})

test('should correctly add up a multiple expense', () => {
    const res = selectExpensesTotal(expenses)
    expect(res).toBe(114195)
})
