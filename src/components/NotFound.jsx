import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
    <div className="content-wrapper">
        <section className="content-header">
            <h1>
                404 Error Page
          </h1>
        </section>
        <section className="content">
            <div className="error-page">
                <h2 className="headline text-red"> 404</h2>
                <div className="error-content">
                    <h3><i className="fa fa-warning text-red" /> Oops! Page not found.</h3>
                    <p>We could not find the page you were looking for.
                Meanwhile, you may <Link to="/ ">return to home page </Link> or try using the search form.
              </p>
                </div>
            </div>
        </section>
    </div>
);


export default NotFound;