// **Sets up the Enzyme library 
// this is because the library is segragated into parts to ship a smaller file.
// we had to install enzyme and the adapter for react 16, now that they're installed they have to be configured to work together

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
    adapter: new Adapter()
})