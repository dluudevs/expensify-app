import { createStore } from 'redux';

//***** Action generators - functions that return action objects
//one of the advantages vs passing an object to dispatch 
    // very difficult to catch errors if typo in passed object
    // easier to identify errors, if function name is spelt incorrectly there would be a reference error
// ** tho not used, the term payload is a property in the action that stores the data to be passe around (ie., in the incrementCount function, the incrementBy property is the payload)

const add = ({a, b}) => (
//destructure the object immediately in the parameters
    a + b
)

console.log(add({a: 5, b: 8}));


const incrementCount = ({ incrementBy = 1} = {}) => ({
        // when setting up this argument, the way it can be interpretted
            //first thing to do is to deconstruct an object. if the object doesn't exist, default the value to an empty object
            //if the object exists but there is no incrementBy property, default the value to 1
        //**any time there is the assignment operator it is for a default value */
        // destructuring expression because of the curly braces wrapped around the variable name and the equal operator
        type: 'INCREMENT',
        incrementBy
        // since incrementBy has a default value if it does not exist, the variable can be directly referenced (the above is the short hand)
    });

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    //no default given because a value is required to set count
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// *** REDUCERS ***
// 1. Reducers are pure functions - the output is determined solely by the arguments passed to it
// 2. Never change state or action - do not change these arguments that are being passed to the reducers. they should simply be read and used to compute the output
    
const countReducer = ((state = { count: 0 }, action) => {
    //action is always an object - action generators are functions that will always return an object
    // switch is preferred over if statements
    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy //same rules on overwriting applies
            };
        case 'DECREMENT':
            //convention to use typeof because a number value of 0 is falsey
            return {
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            }
        default: 
            return state;
    }
});

const store = createStore(countReducer)
//create store needs an argument - a reducer (the function)
    //the reducer's is passed the state. where the default value for state is equivalent to setting the initial state in react
    ///second argument are the actions - this is why createStore runs again when we use the dispatch method - use actions to update state
//the reducer is responsible for setting state

const unsubscribe = store.subscribe(() => {
    console.log(store.getState()) //a method of the store object, returns the current state object
})
//subscribe watches for when state updates, the annonymous function that is passed runs every time the state updates
//the return value of subscribe is a function that can be called to unsubscribe 

//***** Actions - allows changing data in store. always an object
//the dispatch method sends the action object to the store
//when the dispatch method is used createStore function is called 

// store.dispatch({
//     type: 'INCREMENT', //convention to use all caps and _ to seperate words
//     //type must be provided
//     incrementBy: 5
// }); 

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount());
//note that dispatch does NOT expect a callback function, hence why the function being passed has to be called
// the function MUST return an object for createStore's switch statement

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));


