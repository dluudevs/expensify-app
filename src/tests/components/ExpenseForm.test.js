import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expense from '../fixture/expenses'
import moment from 'moment'

// expect methods are from the JEST library
// shallow methods are from the ENZYME library

test('should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expense[0]}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    // in the form submission e.preventDefault is called. the event is not being passed so the method cannot be called. we can pass another argument (the event object) to simulate with the psuedo method. it just has to be a function
    expect(wrapper.state('error').length).toBeGreaterThan(0); //if 0 there is an error, there should be an error message as we are simulating a submission with empty text fields
    expect(wrapper).toMatchSnapshot()
    //this will create two snapshots, once before the simulation is run and one after
})

test('should set a description on input change', () => {
    const value = 'New description'
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    //more than one input element, at index decides which one we want to access (node tree order)
    expect(wrapper.state('description')).toBe(value);
})

test('should set note on text area change', () => {
    const value = "this is my note"
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value)
})  

test('should set amount if valid input', () => {
    const value = '23.50'
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if input is invalid', () => {
    const value = "12.122"
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    //creates a mock functiion - used to create a mock event handler which allows us to assert the prop passed to it or if the function was called. see below 
    const wrapper = shallow(<ExpenseForm expense={expense[0]} onSubmit={onSubmitSpy}/>);
    //note that the mock function must be passed as a prop to the component 
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expense[0].description,
        amount: expense[0].amount,
        note: expense[0].note,
        createdAt: expense[0].createdAt
    }); //define exact object because the onSubmit is not called with an id in the object (as defined in ExpenseForm component)
})

//below we are passing props and checking if the state update as we expect it to
test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm/>)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now) //looks for this component and its prop which handles the date change and calls it with the moment instance
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused: true })
    expect(wrapper.state('calendarFocused')).toBe(true)
})