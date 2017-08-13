import React, { Component } from 'react';

import { Route, Link, Switch } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import GamesPage from './pages/GamesPage'
import DashboardPage from './pages/DashboardPage'
import InboxPage from './pages/InboxPage'
import AboutPage from './pages/AboutPage'
import ChildrenPage from './pages/ChildrenPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
              <div className="row">
                <div className="col-sm-4">
                    <img className="img-responsive" src="assets/img/logo_32.png" alt="logo_32" />
                </div>
                <div className="col-sm-6">

                </div>
                <div className="col-sm-2">
                    <span className="pull-right">Lis ReactJS Starter v1</span>
                </div>
            </div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <Link className="navbar-brand" to="/">Home</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li><Link to="/inbox">Inbox</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/games">Games</Link></li>
                            <li><Link to="/children">Children</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a className="cursor-pointer">
                                    English
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Switch>
              <Route exact path='/' component={DashboardPage} />
              <Route exact path='/games' component={GamesPage} />
              <Route exact path='/inbox' component={InboxPage} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/children' component={ChildrenPage} />
              <Route path='*' component={NotFoundPage}/>
            </Switch>








      </div>
    );
  }
}

export default App;
