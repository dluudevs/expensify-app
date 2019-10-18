import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink activeClassName="is-active" to="/" exact={true}>Dashboard</NavLink>
        <NavLink activeClassName="is-active" to="/create">Create Expense</NavLink>
        <NavLink activeClassName="is-active" to="/help">Help</NavLink>
    </header>
)
// activeClassName - styling applied when the link is active

export default Header;