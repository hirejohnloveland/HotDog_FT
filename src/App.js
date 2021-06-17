import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../src/components/navbar";
import Story from "../src/views/story";
import Food from "../src/views/food";
import OrderWidget from "../src/components/orderwidget";
import TwitterFeed from "../src/components/twitterfeed";

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
    if (response.status === '401') {
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
    .then(this.getCartSummary)
  }

  handleClear = () => {
    fetch(`/api/order/delete`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    .then(this.checkError)
    .then(this.getCartSummary)
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
            <div className="offset-1 col-12 col-md-6 col-lg-6 p-3">
              <Switch>
                <Route path="/story" component={Story} />
                <Route path="/food/:id"   render={({match}) => <Food onAdd={this.handleAdd} match={match} /> } />    
                <Route path="/story" component={Story} />
                <Redirect from="/" to="/story" component={Story} />
              </Switch>
            </div>
            <div className="col-12 col-md-6 col-lg-3 p-3">
              <div className="row">
                <OrderWidget cartPrice={cartPrice} cartCount={cartCount} onClear={this.handleClear}/>
              </div>
              <div className="row mt-3">
                <TwitterFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
