import React, { Component } from "react";

import MenuItem from "../components/menuitem";

class Food extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // Render the menu
    fetch(
      `https://hotdogflask.herokuapp.com/api/menuitems/${this.props.match.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          items: data,
        });
      });
  }

  render() {
    const { onAdd } = this.props;
    return (
      <React.Fragment>
        {this.state.items.map((item, index) => (
          <MenuItem item={item} key={index} onAdd={onAdd} />
        ))}
      </React.Fragment>
    );
  }
}

export default Food;
