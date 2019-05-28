import React from 'react';

import SiteHeader from 'components/SiteHeader';
import Home from 'pages/Home';
import UserPage from 'pages/UserPage';

import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <SiteHeader />
      <Route exact path="/" component={Home} />
      <Route path="/user/:userId" component={UserPage} />
    </Router>
  );
}

export default App;
