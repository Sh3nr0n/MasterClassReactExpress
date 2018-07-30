import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images:[]
    };
  }
  componentDidMount() {
    fetch('/images')
      .then(res => res.json())
      .then(images => this.setState({ images }));
  }

  render() {
    const { images } = this.state;
    return (
      <div className="App">
        {images.map((images, key) => {
          return (
            <div key={key}>
              {images.imageId} {images.description}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;