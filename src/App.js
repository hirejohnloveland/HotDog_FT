import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../src/components/navbar";
import Story from "../src/views/story";
import Dogs from "../src/views/dogs";
import Sides from "../src/views/sides";
import Extras from "../src/views/extras";
import Beverages from "../src/views/beverages";
import Contact from "../src/views/contact";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: localStorage.getItem("token") !== null,
      cartPrice: 0,
      cartCount: 0,
      cartisUpdated: false
    };
  }

  checkError = (response) => {
    if (response.status == '401') {
        localStorage.removeItem("token")
        window.location.reload();
      }
      return response
    }

    
  getToken = () => {
  fetch(`/api/tokens/anon`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      this.setState({
        isAuthenticated: true
      }, this.getCartSummary());
    });
  }
  
  getCartSummary = () => {
    fetch(`/api/order/cart/summary`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
      })
      .then(this.checkError)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cartCount : data.count,
          cartPrice : data.price
        },console.log(data.count, data.price))
      })
  }
      
  handleAdd = (itemID) => {
    fetch(`/api/order/add/${itemID}`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    .then(this.checkError)
    .then(this.getCartSummary())
  }

  handleClear = () => {
    fetch(`/api/order/delete`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    .then(this.checkError)
    .then(this.getCartSummary())
  }

  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.getToken()}
      else {this.getCartSummary()}
  }




  render() {
    const { cartCount, cartPrice } = this.state
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <Switch>
              <Route path="/story" component={Story} />
              <Route path="/dogs"   render={(props) => (<Dogs onAdd={this.handleAdd} onClear={this.handleClear} cartCount={cartCount} cartPrice={cartPrice}/>)} />
              <Route path="/sides" render={(props) => (<Sides onAdd={this.handleAdd} />)} />
              <Route path="/extras" render={(props) => (<Extras onAdd={this.handleAdd} />)} />
              <Route path="/beverages" render={(props) => (<Beverages onAdd={this.handleAdd} />)} />
              <Route path="/contact" component={Contact} />
              <Redirect from="/" to="/story" component={Story} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
