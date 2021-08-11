import _ from 'lodash'
import moment from 'moment'
import Constant from '../Constant'
import Memory from '../store/Memory'
import LogStorage from '../store/LogStorage'
import Util from '../Util'
import LogObservable from './LogObservable'

export interface LoggerOptions {
  logToConsole: boolean
  logToConsoleFunc?: (message: any, ...optionalParams: any[]) => void
}

export interface Message {
  message: string
  timestamp: moment.Moment
  lengthAtInsertion: number
  id: string
  level: string
  color: string
}

class Logger {
  private options: LoggerOptions

  private storage: LogStorage<Message>

  private appStartRendered: boolean

  private messages: Message[]

  private logObservable: LogObservable<Message>

  public constructor(
    options: LoggerOptions = {
      logToConsole: false,
      logToConsoleFunc: () => {}
    },
    storage?: LogStorage<Message>
  ) {
    this.appStartRendered = false

    this.messages = []

    this.logObservable = new LogObservable<Message>()

    this.options = options

    this.storage = storage || new Memory()

    this.init()
  }

  private async init(): Promise<void> {
    await this.initialMessage()
    await this.insertAppStartMessage()
  }

  private async logToConsole(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): Promise<void> {
    if (this.options.logToConsole) {
      if (this.options.logToConsoleFunc) {
        this.options.logToConsoleFunc(message, ...optionalParams)
      } else {
        const availableConsoleLogs =  Object.keys(Constant.LOG_LEVEL);
        const consoleLogFunc = availableConsoleLogs.find(avCL => avCL === level.toUpperCase()) || Constant.LOG_LEVEL.INFO
        switch (consoleLogFunc) {
          case Constant.LOG_LEVEL.INFO:
            console.info(message, ...optionalParams)
            break
          case Constant.LOG_LEVEL.DEBUG:
            console.debug(message, ...optionalParams)
            break
          case Constant.LOG_LEVEL.WARN:
            console.warn(message, ...optionalParams)
            break
          case Constant.LOG_LEVEL.ERROR:
            console.error(message, ...optionalParams)
            break
          default:
            console.log(message, ...optionalParams)
            break
        }
        // console[consoleLogFunc]('[logger-test] logToConsole: ', ...messages)
      }
    }
  }

  protected async initialMessage(): Promise<void> {
    const messages = await this.storage.get()
    if (!_.isEmpty(messages)) {
      this.messages = _.concat(this.messages, messages)
    }
    this.sortMessage()
  }

  private sortMessage(): void {
    this.messages.sort((left, right) => {
      const dateDiff = moment
        .utc(right.timestamp)
        .diff(moment.utc(left.timestamp))
      if (dateDiff === 0) {
        return right.lengthAtInsertion - left.lengthAtInsertion
      }
      return dateDiff
    })
  }

  protected async insertAppStartMessage(): Promise<void>  {
    if (!this.appStartRendered) {
      this.appStartRendered = true
    }
  }

  public async clear(): Promise<void>  {
    this.messages = []
    await this.storage.clear()
    this.logObservable = new LogObservable<Message>()
  }

  private async _log(
    level: string,
    color: string,
    message: any,
    ...optionalParams: any[]
  ): Promise<void> {
    await this.logToConsole(level, message, ...optionalParams)

    const formattedMessages = await this.buildFormattedMessage(
      level,
      color,
      message,
      ...optionalParams
    )
    await this.postLog(formattedMessages)
  }

  private async parseMessage(message: any, ...optionalParams: any[]): Promise<string> {
    const paramString = await this.parseParams(...optionalParams)
    return  `${message} ${paramString}`.trim()
  }

  private async parseParams(...optionalParams: any[]): Promise<string> {
    return optionalParams.map((param) => {
      if (typeof param === 'string') {
        return param
      }
      if (param instanceof String) {
        return param.toString()
      }
      let dataAsString = JSON.stringify(param, null, "  ")
      if (dataAsString && dataAsString.length > 12000) {
        dataAsString = `${dataAsString.substring(0, 12000)
        }...(Cannot display more Logs)`
      }
      return dataAsString
    }).reduce((paramString, param) => `${paramString} ${param}`, '')
  }


  private async buildFormattedMessage(
    level: string,
    color: string,
    message: any,
    ...optionalParams: any[]
  ): Promise<Message> {

    const newId: string = await Util.guid()
    const parseMessage: string = await this.parseMessage(message, ...optionalParams)
    return {
      id: newId,
      lengthAtInsertion: this.messages.length,
      level,
      message: parseMessage,
      timestamp: moment(),
      color
    }
  }

  private async postLog(formattedMessage: Message): Promise<void>  {
    await this.insertToStorage([formattedMessage])
    await this.emitMessageChanged(formattedMessage)
  }

  public async getStorage(): Promise<Message[] | []> {
    const preData =  await this.storage.get()
    return preData
  }

  private async emitMessageChanged(formattedMessage: Message): Promise<void> {
    this.logObservable.next(formattedMessage)
  }

  public async subscribe(callback: (value: Message) => void): Promise<void> {
    this.logObservable.subscribe(callback)
  }

  public async unsubscribe(): Promise<void> {
    this.logObservable.unsubscribe()
  }

  private async insertToStorage(formattedMessages: Message[]): Promise<void> {
    await this.storage.set(formattedMessages)
  }

  public async info(message: any, ...optionalParams: any[]): Promise<void> {
    return this._log(
      Constant.LOG_LEVEL.INFO,
      Constant.COLOR.INFO,
      message,
      ...optionalParams
    )
  }

  public async debug(message: any, ...optionalParams: any[]): Promise<void> {
    return this._log(
      Constant.LOG_LEVEL.DEBUG,
      Constant.COLOR.DEBUG,
      message,
      ...optionalParams
    )
  }

  public async log(message: any, ...optionalParams: any[]): Promise<void> {
    return this._log(
      Constant.LOG_LEVEL.LOG,
      Constant.COLOR.LOG,
      message,
      ...optionalParams
    )
  }

  public async warn(message: any, ...optionalParams: any[]): Promise<void> {
    return this._log(
      Constant.LOG_LEVEL.WARN,
      Constant.COLOR.WARN,
      message,
      ...optionalParams
    )
  }

  public async error(message: any, ...optionalParams: any[]): Promise<void> {
    return this._log(
      Constant.LOG_LEVEL.ERROR,
      Constant.COLOR.ERROR,
      message,
      ...optionalParams
    )
  }
}

export default Logger
