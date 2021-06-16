import React, { Component } from "react";
import "../css/orderwidget.css";

class OrderWidget extends Component {
  state = {};
  render() {
    const {onClear, cartCount, cartPrice} = this.props
    return (
      <div className="card w-100">
        <div className="card-body">
          <h2 className="card-title">Your Order</h2>
          <h3 className="card-subtitle mb-2 text-muted">Total Items - {cartCount}</h3>
          <h3 className="card-subtitle mb-2 text-muted">Order Total - ${(cartPrice * 1.0825).toFixed(2)}</h3>
          <button className="btn btn-primary">Checkout</button>
          <button onClick={() => onClear()} className="btn btn-danger pull-right">Clear Cart</button>
        </div>
      </div>
    );
  }
}

export default OrderWidget;
