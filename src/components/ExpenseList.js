import React from 'react';
import { connect } from 'react-redux';
// used to connect the component to the store
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense}/>)
                //spread the object so that it can be deconstructured
                // this works because the prop being passed is already an object
                // note that spreading the object without a props name is a react syntax not javascript - this is passing the entire object rather than having the object be a property of prop (no longer prop.[propName])
            )
        }
    </div>
);

//state is actually the store, these are properties in the store that react-redux is connecting our react components with
const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
    // return value of this function is what will be rendered above
});
// this object returned in this function is passed as a prop to the component below (must be an object) - this object contains properties we want our component to access from the store


// the connect function gives direct access to the object in store - when the component is connected to the store, the component is reactive. it will update its props when the store updates
export default connect(mapStateToProps)(ExpenseList);
// first argument MUST be a function (the data from the store)
// second argument is the component that receives the data as props

// ***Dont worry about the bottom part too much for now just understand teh above**
    //the two paranthesis function call is referred to as function currying. the first call returns a function, where the second bracket passes the ExpenseList argment to the returned function
        //the first function returns an object
        // return value of first function passed to the second function - where the second function returns a component with the return value of the first function as a prop

    // ** GENERAL IDEA

    // const connect = (mapStateToProps) => {
    //     return (mapStateToProps) {
    //         return SimpleComponent(mapStateToProps)
    //     }
    // }

