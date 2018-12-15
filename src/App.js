import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <div style={{width: 400, border: '3px solid black'}}>
            <h2>Layout works!</h2>
          </div>
        </Layout>
      </div>
    );
  }
}

export default App;
