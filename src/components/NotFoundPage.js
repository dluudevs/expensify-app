import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        404! - <Link to="/">Go Home</Link>
    </div>
)
//By using link we are using client side routing (server side routing would cause the page to refresh)

export default NotFoundPage;