//Higher Order Component - A component that renders another component
    // Advantages
        // reuse code - allows us to modify and change a series of existing component without having re-write the code multiple times
        // render hijacking
        // prop manipulation
        // abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// Higher order component - similar to higher order function (which accepts a function and/or returns a function)
// this is a function that returns a HoC
const withAdminWarning = (WrappedComponent) => {
    // below is the HOC
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info. Please don't share</p> }
            <WrappedComponent {...props}/>
        </div>
        // by spreading props, all props are being passed to the child (eg., info: 'there are more details')
        // props are basically just objects - its why we can spread them
        // note that spreading the object without a props name is a react syntax not javascript - this is passing the entire object rather than having the object be a property of prop (no longer prop.[propName])
    )
};

const AdminInfo = withAdminWarning(Info);
//the wrapped component, is a function that returns JSX. its why it can be instantiated as a component in the HoC above

// requireAuthentication
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <p>You are accessing private information</p> : <p>You do not have the credentials to access</p> }
            {props.isAuthenticated && <WrappedComponent {...props} />}
        </div>
    )
}
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} info="there are more details"/>, document.getElementById('app'))