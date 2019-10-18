import React from 'react';
import { connect } from 'react-redux'; 
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

//export this class for testing purposes. for purpose of rendering the below default will be the component to render
// use a class based component so there is no need to write in-line function
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense)
        //history is passed to this component from browserRouter (appRouter.js) - can always check dev tools
        this.props.history.push('/') //push takes a string argument of the path (same as the one setup in the router) - push forces a path change
    }

    render(){
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

//can access and call the below function via props to dispatch - otherwise it would be difficult to test the following: props.dispatch(addExpense(expense))
// "abstracts dispatcher functions"
const mapDispatchToProps = (dispatch) => ({
    // since props is an object, the function must return an object
    addExpense: (expense) => dispatch(addExpense(expense))
});

//first argument in connect is for state, no state is needed so undefined is passed. for the second argument pass in the function used to mapDispatchToProps
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
//connect component to the store in order to dispatch - dispatch is passed as a prop to the component
// dont need anythinig from state, leave first paranthesis empty
