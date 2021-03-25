import React from 'react';
import logo from './logo.svg';
import './App.css';
import {LoggerFactory,LOG_STORAGE_TYPE} from '../../dist/index'
import LoggerPage from './LoggerPage';

function App() {
  LoggerFactory.createLogger({logToConsole:true},LOG_STORAGE_TYPE.LOCALSTORAGE)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoggerPage/>
      </header>
    </div>
  );
}

export default App;
