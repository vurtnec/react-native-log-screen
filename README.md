# Features

* Colored logging to your console and easy to integration in your customerized component. 

* Different log levels

* Log in Memory/Storage

* Using Rxjs observer and subscriber to track logs.


# Usage

1. Initial logger only once when your application init.

```typescript
    LoggerFactory.createLogger({
            logToConsole:true
     },
    LOG_STORAGE_TYPE.LOCALSTORAGE)

``` 
LOG_STORAGE_TYPE can be LOCALSTORAGE & MEMORY

* LoggerOptions can be use to integration other log instance, please use logToConsoleFunc as logger callback.
  
```typescript
     LoggerOptions {
        logToConsole: boolean
        logToConsoleFunc?: (message: any, ...optionalParams: any[]) => void
    }
```

2. Use logger
* Initial LoggerFactory
* Subscribe logger
E.g
```typescript
   logger.subscribe(message => {
         // eslint-disable-next-line react/no-access-state-in-setstate
         this.setState({ logData: [...this.state.logData, message] })
       })
   ```
   * Use logger the same as console.log logger.debug() logger.info() etc. 


3. Example
   Please refer to LoggerPage.ts

   