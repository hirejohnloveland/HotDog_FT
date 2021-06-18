import React, { Component } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

class TwitterFeed extends Component {
  render() {
    return (
      <div className="widgets__widgetContainer">
        <h2>Check us out</h2>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="DoggySt26961450"
          options={{ height: 770 }}
        />
      </div>
    );
  }
}

export default TwitterFeed;
