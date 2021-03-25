import React, { Component } from 'react'
import {LOG_STORAGE_TYPE, LoggerFactory} from '../../../dist/index'


export class LoggerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logData: []
    }
    LoggerFactory.getLogger().subscribe(message => {
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ logData: [...this.state.logData, message] })
    })
  }

  componentDidMount() {
    const preData = async () => {
      const response = await LoggerFactory.getLogger().getStorage()
      if(response !== undefined && response.length > 0){
        this.setState({
          logData: response
        })
      }
    }
    preData();
  }

  componentWillUnmount() {
    LoggerFactory.getLogger().unsubscribe()
  }

  list = () => this.state.logData.map(element => (
    <div key={element.id} style={{ margin: 10,color:element.color}}>
      <span >{element.timestamp.toString()}:  </span>
      <span >[{element.level}]  </span>
      <span >{element.message}</span>
    </div>
  ))

  handleClickError() {
    LoggerFactory.getLogger().error('The link was clicked.');
  }

  handleClickInfo() {
    LoggerFactory.getLogger().info('The link was clicked.');
  }

  handleClickDebug() {
    LoggerFactory.getLogger().debug('The link was clicked.');
  }

  handleClickLog() {
    LoggerFactory.getLogger().log('The link was clicked.');
  }


  handleClickWarn() {
    LoggerFactory.getLogger().warn('The link was clicked.');
  }

  handleCleanError() {
    const cleanLog = async () => {
      const response = await LoggerFactory.getLogger().clear()
      this.setState({
        logData: []
      })
      // resubscribe
    LoggerFactory.getLogger().subscribe(message => {
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ logData: [...this.state.logData, message] })
    })
    }
    cleanLog();
  }


  render() {
    return (<div>{this.list()}
    <button onClick={() => this.handleClickError()}>Error</button>
    <button onClick={() => this.handleClickInfo()}>Info</button>
    <button onClick={() => this.handleClickDebug()}>Debug</button>
    <button onClick={() => this.handleClickLog()}>Log</button>
    <button onClick={() => this.handleClickWarn()}>WARN</button>
    <br></br>
    <button onClick={() => this.handleCleanError()}>Clean</button>
    </div>
   )
  }
}
export default LoggerPage