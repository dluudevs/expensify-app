import filtersReducer from '../../reducers/filters';
import moment from 'moment'

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' })
    //undefined is the same as not passing in any value
    //redux dispatches a special action to the reducer to set up the store (above) - only used to test if reducer is setup correctly
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
    expect(state.sortBy).toBe('amount')
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const action = { type: 'SORT_BY_DATE' }
    const state = filtersReducer(currentState, action)
    expect(state.sortBy).toBe('date')
});

//should set text filter
test('should set text filter', () => {
    const text = 'some value'
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text })
    expect(state.text).toBe(text)
});

//should set startDate filter
test('should set startDate filter', () => {
    const startDate = moment(0)
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate })
    expect(state.startDate).toBe(startDate)
});

//should set endDate filter
test('should set endDate filter', () => {
    const endDate = moment(-1000)
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate })
    expect(state.endDate).toBe(endDate)
});
