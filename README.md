# Features

* Colored logging to your console and easy to integration in your customerized component. 

* Different log levels

* Log in Memory/Storage


# Usage

1. Initial logger only once when your application init.

```typescript
  public static createLogger(options?: LoggerOptions, storage?: LOG_STORAGE_TYPE): Logger {
    this._instance = new Logger(options, LoggerFactory.createStorage(storage))
    return this._instance
  }
``` 

* LoggerOptions can be use to integration other log instance, please use logToConsoleFunc as logger callback.
  
```typescript
     LoggerOptions {
        logToConsole: boolean
        logToConsoleFunc?: (message: any, ...optionalParams: any[]) => void
    }
```
  Also the LOG_STORAGE_TYPE can be implements and customersized class.

   ```typescript
   export const logger = LoggerFactory.createLogger({
     logToConsole: true
   })
   ```

2. Use logger

3. ```typescript
   logger.subscribe(message => {
         // eslint-disable-next-line react/no-access-state-in-setstate
         this.setState({ logData: [...this.state.logData, message] })
       })
   ```

4. Example

   ```typescript
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
   
   ```

   