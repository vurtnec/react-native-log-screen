import logo from './logo.svg';
import './App.css';
import LoggerPage from './component/LoggerPage'
import { LoggerFactory } from './index.ts'
import { LOG_STORAGE_TYPE } from './index.ts';
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
