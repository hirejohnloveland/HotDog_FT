import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../src/components/navbar";
import Story from "../src/views/story";
import Food from "../src/views/food";
import Cart from "../src/views/cart";
import OrderWidget from "../src/components/orderwidget";
import TwitterFeed from "../src/components/twitterfeed";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: localStorage.getItem("token") !== null,
      items: [],
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
  
  getCart = () => {
    fetch(`/api/order/cart`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
      })
      .then(this.checkError)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          items: data
        })
      })
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
        })
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
    .then(this.getCart)
  }

  handleDelete = (itemOId) => {
    fetch(`/api/order/remove/${itemOId}`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    .then(this.checkError)
    .then(this.getCartSummary)
    .then(this.getCart)
  }

  handleClear = () => {
    console.log('clear')
    fetch(`/api/order/delete`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    .then(this.checkError)
    .then(this.getCartSummary)
    .then(this.getCart)
  }

  componentDidMount() {
    if (!this.state.isAuthenticated) {
      this.getToken()}
      else {
        this.getCartSummary()
        this.getCart()
      }
      console.log(this.state.isAuthenticated)
  }

  render() {
    const { cartCount, cartPrice, items } = this.state
    return (
      <div>
        <Navbar onCheckout={this.handleClear}/>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-6 p-3">
              <Switch>
                <Route path="/story" component={Story} />
                <Route path="/food/:id"   render={({match}) => <Food onAdd={this.handleAdd} match={match} /> } />    
                <Route path="/cart" render={(props) => (<Cart onDelete={this.handleDelete} items={items}/>)} />
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
