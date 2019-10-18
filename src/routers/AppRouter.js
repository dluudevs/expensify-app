import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';import React from 'react';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
    // browserRouter can only have one child (div)
    // without the exact prop, it changes how matching works. will only show the / page if it exactly matches it
    // since the header component sits outside of switch, it will always show
    //switch - once the first match of the path is found, only render that component (exclusive rendering)
    //note that the path prop in the route component is optional

    //**Using route, creates a set of props that is being passed to the component */
        //in the edit path, the colon creates a variable that allows the path to be dynamically generated - this is passed as a prop from route to the component and can be accessed via props.match.params.id (where id is the name of the variable)
)

export default AppRouter;