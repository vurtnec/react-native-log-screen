import { Message } from '../model/Logger'

abstract class LogStorage<T> {

  abstract async get(callBack?: Function): Promise<T[] | []>

  abstract async set(
    messages: T[],
    callBack?: Function
  ): Promise<T[] | []>

  abstract async clear(callBack?: Function): Promise<void>
}

export default LogStorage
