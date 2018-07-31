import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList:[]
    };
    
  }
  
  componentDidMount() {
    fetch('/images')
      .then(res => res.json())
      .then(images => this.setState({ imageList: images }))
  }


  render() {

    // Debug line of code to monitor the image state due to the use of async functions
    setTimeout(console.log('this.state.imageList is : ',this.state.imageList),1000)

    const { imageList } = this.state;

    return (
      <div className="App">
        {imageList.map((image, key) => {
          return (
            <div key={key}>
              {image.imageId} {image.description}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;