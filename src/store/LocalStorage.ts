import LogStorage from './LogStorage'
import { Message } from '../model/Logger'

class LocalStorage extends LogStorage<Message> {
  public localStorageKey = 'appLog'

  private data: Message[] = []

  public constructor() {
    super()
    this.data = []
  }

  public async get(callback?: Function): Promise<Message[] | []> {
    if (callback) {
      await callback
    }
    const data = localStorage.getItem(this.localStorageKey) || '{}'
    return JSON.parse(data)
  }

  public async set(messages: Message[], callback?: Function): Promise<Message[] | []> {
    if (callback) {
      await callback
    }
    const newValue: string = JSON.stringify(this.data.concat(messages))
    localStorage.setItem(this.localStorageKey, newValue)
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '{}')
  }

  public async clear(callback?: Function): Promise<void> {
    if (callback) {
      await callback
    }
    localStorage.removeItem(this.localStorageKey)
    this.data = []
  }
}

export default LocalStorage
