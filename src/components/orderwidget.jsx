import React, { Component } from "react";
import { Link} from 'react-router-dom'


class OrderWidget extends Component {
  state = {};
  render() {
    const {onClear, onCheckout, cartCount, cartPrice} = this.props
    return (
      <div className="card w-100">
        <div className="card-body">
          <h2 className="card-title">Your Order</h2>
          <h3 className="card-subtitle mb-2 text-muted">Total Items - {cartCount}</h3>
          <h3 className="card-subtitle mb-2 text-muted">Order Total - ${(cartPrice * 1.0825).toFixed(2)}</h3>
          <button onClick={() => onCheckout()}className="btn btn-success m-1">Checkout</button>
          <Link to="/cart" className="btn btn-primary m-1">Change Your Order</Link>
          <button onClick={() => onClear()} className="btn btn-danger m-1">Delete Order</button>
        </div>
      </div>
    );
  }
}

export default OrderWidget;
