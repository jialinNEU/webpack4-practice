import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './home';
import List from './list';

class App extends Component {
  componentDidMount() {
    // 该服务器允许跨域请求
    axios.get('/react/api/header.json')
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
