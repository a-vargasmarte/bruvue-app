import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Pages/Home';
import DraftMenu from './Components/Pages/DraftMenu';
import BeerBrowser from './Components/Pages/BeerBrowser';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
const BrowserRouter = require('react-router-dom').BrowserRouter;
const Route = require('react-router-dom').Route;

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="App">
          <Layout>
            <Route path='/Home' exact={true} component={Home} />
            <Route path='/' exact={true} component={Home} />
            <Route path='/DraftMenu' exact={true} component={DraftMenu} />
            <Route path='/BeerBrowser' exact={true} component={BeerBrowser} />
          </Layout>

        </div>
      </BrowserRouter>




    );
  }
}

export default App;
