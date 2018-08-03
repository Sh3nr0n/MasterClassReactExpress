import React, { Component, Fragment } from "react";
import { Menu } from "semantic-ui-react";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "inbox"
    };
  }

  handleItemClick = (e, { name }) => {
    console.log("received menu click event : ", e);
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Fragment>
        <Menu pointing secondary>
          <Menu.Item
            name="inbox"
            active={activeItem === "inbox"}
            onClick={this.handleItemClick}
          >
            Galerie
          </Menu.Item>

          <Menu.Item
            name="spam"
            active={activeItem === "spam"}
            onClick={this.handleItemClick}
          >
            Articles
          </Menu.Item>

          <Menu.Item
            name="updates"
            active={activeItem === "updates"}
            onClick={this.handleItemClick}
          >
            Auteur
          </Menu.Item>
        </Menu>
      </Fragment>
    );
  }
}

export default MenuBar;
