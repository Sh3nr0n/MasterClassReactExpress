import React, { Component, Fragment } from 'react';
import ImageContainer  from './components/ImageContainer'
import MenuBar  from './components/MenuBar'

class App extends Component {

  render() {
    return (
      <Fragment >
        <MenuBar/>
        <ImageContainer />
        
      </Fragment>
    );
  }
}

export default App;