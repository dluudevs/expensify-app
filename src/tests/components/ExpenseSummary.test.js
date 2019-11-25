import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseSummary } from '../../components/ExpenseSummary'

test('should correctly render ExpenseSummary with 1 expense', () => {
    //shallow render the component - allows passing of props to component
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expenseTotal={5000}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should correctly render ExpenseSummary with multiple expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={23} expenseTotal={12539490}/>)
    expect(wrapper).toMatchSnapshot()
})