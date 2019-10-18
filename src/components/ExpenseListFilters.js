import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';


export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    // this callback function will get called with an object with startDate and endDate properties (from the DateRangePicker prop - onDatesChange)
    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    };

    //this callback function simply updates the focus state of the calendaar
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
        // dispatch function is passed as a prop to a connected component
    }

    onSortChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate()
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount()
        }
    }

    render(){
        return(
            <div>
                <input
                    type="text"
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                />
                <select
                    value={this.props.filters.sortBy} //for controlled input (javascript controls the value, same concept as the input above)
                    onChange={this.onSortChange}
                >
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
//connect components have access to the dispatch function. you can inspect in react dev tools that dispatch prop with a dispatch function is passed to the component
