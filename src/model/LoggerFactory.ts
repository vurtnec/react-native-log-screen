import Logger, { LoggerOptions, Message } from './Logger'
import LogStorage from '../store/LogStorage'
import Constant, { LOG_STORAGE_TYPE } from '../Constant'
import Memory from '../store/Memory'
import LocalStorage from '../store/LocalStorage'

export default class LoggerFactory {

  private static _instance: Logger

  public static getLogger() {
    if (this._instance) {
      return this._instance
    }
    console.warn('Create a new Logger without options.')
    return this.createLogger()
  }

  static createLogger(): Logger;

  static createLogger(options: LoggerOptions): Logger;

  static createLogger(options: LoggerOptions, storage: LOG_STORAGE_TYPE): Logger;

  static createLogger(options: LoggerOptions, storage: LogStorage<Message>): Logger;

  public static createLogger(options?: LoggerOptions, storage?: LOG_STORAGE_TYPE | LogStorage<Message>): Logger {
    if(storage instanceof LogStorage) {
      this._instance = new Logger(options, storage)
    }else {
      this._instance = new Logger(options, LoggerFactory.createStorage(storage))
    }
    return this._instance
  }

  public static createStorage(storage: LOG_STORAGE_TYPE = Constant.STORAGE.MEMORY): LogStorage<Message> {
    switch (storage) {
      case Constant.STORAGE.MEMORY:
        return new Memory()
        break
      case Constant.STORAGE.LOCALSTORAGE:
        return new LocalStorage()
        break
      // case Constant.STORAGE.REALM:
      //   return new RealmStorage()
      //   break
      default:
        return new Memory()
    }
  }


}
