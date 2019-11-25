import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total'

export const ExpenseSummary = ({ expenseCount, expenseTotal}) => {
    const expenseWord = expenseCount > 1 ? 'expenses' : 'expense'
    const formattedExpenseTotal = numeral(expenseTotal / 100).format(`$0,0.00`)
    return (
        <div>
            {
                expenseCount === 0 ? (
                    <h1>There are no expenses that match your filters</h1> 
                )
                : (
                    <h1>Viewing {`${expenseCount} ${expenseWord} totalling ${formattedExpenseTotal}`}</h1>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    
    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary)