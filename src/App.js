import React, { Component } from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navbar from '../src/components/navbar'
import Story from '../src/views/story'
import Dogs from '../src/views/dogs'
import Sides from '../src/views/sides'
import Extras from '../src/views/extras'
import Beverages from '../src/views/beverages'
import Contact from '../src/views/contact'




export default class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() { 
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
        <Switch>
          <Route path='/story' component={Story} />
          <Route path='/dogs' component={Dogs} />
          <Route path='/sides' component={Sides} />
          <Route path='/extras' component={Extras} />
          <Route path='/beverages' component={Beverages} />
          <Route path='/contact' component={Contact} />
          <Redirect from='/' to='/story' component={Story} />
        </Switch>
        </div>
      </div>
    </div>
  )}
}


 


