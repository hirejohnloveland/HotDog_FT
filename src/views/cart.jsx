import React, { Component } from "react";

import OrderItem from "../components/orderitem";

class Cart extends Component {
  render() {
    const { onDelete, items } = this.props;
    return (
      <React.Fragment>
        {items.map((item, index) => (
          <OrderItem item={item} key={index} onDelete={onDelete} />
        ))}
      </React.Fragment>
    );
  }
}

export default Cart;
