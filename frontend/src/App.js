import React from 'react';

import SiteHeader from 'components/SiteHeader';
import Home from 'pages/Home';
import UserPage from 'pages/UserPage';

import { Route } from "react-router-dom";


function App() {
  return (
    <>
      <SiteHeader />
      <Route exact path="/" component={Home} />
      <Route path="/user/:userId" component={UserPage} />
    </>
  );
}

export default App;
