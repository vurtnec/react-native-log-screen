import { Observable } from 'rxjs'
import LogStorage from './LogStorage'
import { Message } from '../model/Logger'

class Memory extends LogStorage<Message> {
  private data: Message[]

  public constructor() {
    super()
    this.data = []
  }

  public async get(callback?: Function): Promise<Message[] | []> {
    if (callback) {
      await callback()
    }
    return this.data
  }

  public async set(messages: Message[], callback?: Function): Promise<Message[] | []> {
    const newData = this.data.concat(messages)
    if (callback) {
      await callback()
    }
    this.data = newData
    return this.data
  }

  public async clear(callback?: Function): Promise<void> {
    this.data = []
    if (callback) {
      await callback()
    }
  }
}

export default Memory
