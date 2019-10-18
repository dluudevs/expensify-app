import selectExpenses from '../../selectors/expenses'
import moment from 'moment'
import expenses from '../fixture/expenses'


test('should filter by test value,', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([
        expenses[2],
        expenses[1]
    ])
    //function sorts by most recent date
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([
        expenses[2],
        expenses[0]
    ])
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }
    // this doesnt break because selectExpnses has a conditional expression that checks for falsey values (undefined), falsey values are ignored.
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[0], expenses[1]])
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ])
});

test('test should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters)
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
});

