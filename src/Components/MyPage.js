//import SortingHat from "./Components/SortingHat";

import React from 'react'
import NoMatch from "./NoMatch";
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";


export default function MyPage({isLoggedIn}) {
    
    if (isLoggedIn === true) {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-6">
                        <h2>My Page</h2>
                    </div>    
                </div>
            </div>
        )
    } else {
        return (
            <Router>
                <Route>
                    <NoMatch />
                </Route>
            </Router>
        )
    }
}