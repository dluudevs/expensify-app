import React from 'react';
import moment from 'moment';
// date object is too complex, moment library is the standard for dates
import { SingleDatePicker } from 'react-dates';

const now = moment();
console.log(now.format('MMM Do YYYY'))

export default class ExpenseForm extends React.Component{
    //state will keep track of on change, once user submits send the data
    constructor(props){
        super(props);

        // ternary operators, in AddExpense it will render empty fields. For editExpense a prop is passed to it, render the input to show these values
        this.state = {
            description: props.expense ? props.expense.description : '', //cannot do props.expense.description || '' because you will get an error cannot read property of undefined. which will crash the app
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(), //must pass in the prop to create a time based on when the expense was created, otherwise if there is no argument moment will create a moment object when the code is run
            calendarFocused: false,
            error: ''
        };
    }

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({ description }))
    };

    onNoteChange = e => {
        const note = e.target.value;
        this.setState(() => ({ note }))
    };

    onAmountChange = e => {
        const amount = e.target.value;
        // if there is no amount or the amount provided is a match, update the state which updates the values in the input field
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }))
        }
        // match(/^\d{1,}(\.\d{0,2})?$/)
    };
     //since this function controls the input, it can be used to restrict the values we allow the user to input (update state if requirements met, value is derived from the state)

    // ^ - first character
    // {1,} first character must be a digit between 1 and infinity (cannot start with decimal)
    // ()? - optional group. have it once or 0 times
    // \.\d{0, 2}? look for 1 decimal place and zero totwo digits after it (escape the .)
    // $ - look for match up to this point (end match at this point)

    onDateChange = (createdAt) => {
        //if there is a date - setState. this will prevent the user from clearing the value, similar idea to the onAmountChange function
        if(createdAt){
            this.setState(() => ({ createdAt }))
        }
    };
    // the onDateChange event listner will call this callback function and pass it the moment object

    onFocusChange = ({ focused }) => {
        //destructures the value from the focused property into its own variable (const { focused: focused } = { focused: true} )
        // where the key in the destructor is the key in the object
        this.setState(() => ({ calendarFocused: focused }))
    };

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(() => ({ error: 'Please provide a description and amount' }))
            // Set error state equal to 'Please provide description and amount'
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //parseFloat keeps decimals * 100 to keep everything in cents
                createdAt: this.state.createdAt.valueOf(), //JS works with ms, this function gives the current date in ms,
                note: this.state.note
            })
        }
    };

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit} action="">
                    <input  
                        type="text"
                        placeholder="Description"
                        autoFocus //focuses on the form on page load
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1} //shows 1 month
                        isOutsideRange={() => false} //make every day available, by default only present and future dates are available
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    };
}

