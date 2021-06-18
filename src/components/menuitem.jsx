import React, { Component } from "react";

class MenuItem extends Component {
  state = {};
  render() {
    const item = this.props.item;

    return (
      <div className="container">
        <div className="card mb-3 w-100">
          <div className="row g-0">
            <div className="col-sm-12 col-xl-4">
              <img
                className="card-img-top h-100 img-responsive"
                src={item.image}
                alt="..."
              />
            </div>
            <div className="col-sm-12 col-xl-8">
              <div class="card-header">
                <h3 className="card-title">{item.name}</h3>
              </div>
              <div className="card-body my-auto">
                <h5 className="card-text my-auto">{item.desc}</h5>
              </div>

              <button
                onClick={() => this.props.onAdd(item.id)}
                className="btn btn-primary m-2"
              >
                Add to Cart for {item.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuItem;
