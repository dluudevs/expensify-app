import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm.js';
import { editExpenses, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.editExpenses(this.props.expense.id, expense)
        this.props.history.push('/')
    }

    onClick = () => {
        this.props.removeExpense({ id: this.props.expense.id })
        this.props.history.push('/');
    }

    render(){
        return (
            <div>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                    expense={this.props.expense}
                // props.expense is the state this component is connected to
                />
                <button onClick={this.onClick}>Remove</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    editExpenses: (id, expense) => dispatch(editExpenses(id, expense)),
    removeExpense: (expenseId) => dispatch(removeExpense(expenseId))
})

// match is a property passed as prop from router, the id is a params that is declared in the component's path (router)
const mapStateToProps = (state, props) => ({
    // note that the props argument is only used here for comparison purposes, the props above is accessing the state object defined below
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage); //this is the higher order component (this is the component we are exporting)
