import React, { Component } from 'react'
import { View, Button } from 'native-base'
import {
  Text
} from 'react-native'
import { logger } from '../index'


class LoggerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logData: []
    }
    logger.subscribe(message => {
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ logData: [...this.state.logData, message] })
    })
  }

  componentWillUnmount() {
    logger.unsubscribe()
  }

  list = () => this.state.logData.map(element => (
    <View key={element.id} style={{ margin: 10 }}>
      <Text>{element.message}</Text>
      <Text>{element.id}</Text>
    </View>
  ))

  render() {
    return (<View style={{paddingTop: 30}}>
      {this.list()}
      <View>
        <Button  onPress={() => {
          logger.log(`[log-test] ${{b: 1}}`, 11111, {a: 1})
        }}>
          <Text>add</Text>
        </Button>

      </View>
    </View>)
  }
}

export default LoggerPage
