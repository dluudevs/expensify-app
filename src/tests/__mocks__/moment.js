//creating a mock version of moment because a timestamp is created at the point in which the test runs, this will cause the moments to differ from snapshot to snapshot

const moment = require.requireActual('moment')

//cannot use regular import because it will look for the mock version - resulting in the function calling itself
//this node method will look for the original module

export default (timestamp = 0) => {
    return moment(timestamp)
}