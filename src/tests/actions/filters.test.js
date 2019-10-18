import { 
    setStartDate, 
    setEndDate, 
    setTextFilter, 
    sortByDate, 
    sortByAmount  
} from '../../actions/filters'
import moment from 'moment'

test('should generate setStartDate action object', () => {
    const action = setStartDate(moment(0))
    // pass argument to moment to set a fixed time - so we know what to expect in the assertion
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
});

test('should generate setEndDate action object', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type:'SET_END_DATE',
        endDate: moment(0)
    })
});

test('should generate setTextFilter action  with passed value', () => {
    const text = 'some random value'
    const action = setTextFilter(text)
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    })
});

test('should generate setTextFilter action with default values', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

test('should generate sortByDate action object', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
});

test('should expect a sortByAmount action object', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});
