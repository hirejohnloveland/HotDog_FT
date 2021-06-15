import React, { Component } from "react";
import OrderWidget from "../components/orderwidget";
import TwitterFeed from "../components/twitterfeed";


class Story extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="offset-1 col-12 col-md-6 col-lg-6 p-3">
          <img
            className="d-block m-auto"
            src="https://res.cloudinary.com/coding-temple/image/upload/v1623719387/Top-10-Best-Images-of-Dogs-Wearing-Monocles-4_pokkoi.jpg"
            alt=""
            width="300"
          />
          <h1 className="mt-3">Our Story</h1>
          <h5>Doggy Style hotdogs was born in 2020, when restaurateur Alexandra
          Antoine and chef John Loveland began to contemplate a simple, yet
          tasty idea. They combined John's kitchen flair and gutsy marketing
          with Alexandra's pop up food truck concept to deliver gourmet hot dogs
          to the masses. With irreverant marketing, and the hottest flavors,
          Doggy Style is taking the hot dog food truck underground by storm.</h5>
        
          <br />
          <h5>With over zero locations in as many states, this concept is more than
          just a pipe dream, it's also a demo e-commerce site. Shop around and you'll 
          soon find your mouth watering and your heart wishing that they had done the food truck
          instead of a web design boot camp. </h5>
        </div>

        <div className="col-12 col-md-6 col-lg-3 p-3">
          <div className="row">
            <OrderWidget />
          </div>
          <div className="row mt-3">
            <TwitterFeed />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Story;
