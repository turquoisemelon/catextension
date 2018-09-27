/*global chrome*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getApiData } from './api_call.js';

class App extends Component {
  sendRequest(request) {
    getApiData()
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: request}, (response) => {
          alert(response);
      });
    });
    return;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* @todo: put a cat icon in here */}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Catlify</h1>
        </header>
        <p>Click to start Catifying</p>
        <button onClick={() => this.sendRequest('getApiData')}>Catify me</button>
      </div>
    );
  }
}

export default App;
