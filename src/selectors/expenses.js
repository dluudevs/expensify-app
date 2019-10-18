import moment from 'moment'

// Selectors are functions that need to query the store 
    // the below function needs data from store to filter 

//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const createdAtMoment = moment(expense.createdAt)
        // this query method (expense.createdAt) allows us to compare dates created by the moment object
        // takes in moment and compares by day **note this is all in the docs under query
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
        //start date either exists or it doesnt
        //only return the item if exists
        //no filter applied must evaluate to true - see the && operator below
        // the result is always a boolean value since comparison operators are beign used
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
            // 1 comes after, -1 comes first - most recent sits at the top
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
};

export default getVisibleExpenses;