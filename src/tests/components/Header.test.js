import React from 'react'
import Header from '../../components/Header'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
// shallow rendering - tests what is being rendered
// enzyme library used to test what shallow rendering

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />)
    //without the toJson function the snapshot will include code from the enzyme library, if anything with enzyme changes jest will thnk the snapshot has changed
    expect(toJSON(wrapper)).toMatchSnapshot()
    // expect(wrapper.find('h1').text()).toBe("Expensify")
    // the first snapshot from the test case gets saved in the snapshot folder and used as a reference to track changes
    // whenever a change is made, the test will fail (it will differ from the snapshot). at this point if we want to accept the changes we can press 'u' in the terminal or change our code
})