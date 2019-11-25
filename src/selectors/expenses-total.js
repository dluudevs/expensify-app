export default (expenses) => {
    return expenses
        .map(expense => expense.amount)
        .reduce((total, amount) => total + amount, 0) //start count at 0. this works even on empty arrays
}