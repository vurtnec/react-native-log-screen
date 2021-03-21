import LogStorage from './LogStorage'
import { Message } from '../model/Logger'

class LocalStorage extends LogStorage<Message> {
  public localStorageKey = 'appLog'
  private _localStorage:any; 

  private data: Message[] = []

  public constructor() {
    super()
    this.data = []
    this._localStorage = this.queryAvailableLocalStorage()
  }

  public async queryAvailableLocalStorage(){
    if(localStorage){
      return localStorage
    }else{
        return window.localStorage
    }
  }

  public async get(callback?: Function): Promise<Message[] | []> {
    if (callback) {
      await callback
    }
    const data = await localStorage.getItem(this.localStorageKey) || '{}'
    return JSON.parse(data)
  }

  public async set(messages: Message[], callback?: Function): Promise<Message[] | []> {
    if (callback) {
      await callback
    }
    //old localStorage data
    const oldData:Message[] = await this.get();
    const newData = oldData.length >0? oldData.concat(messages) : messages;
    this.data = newData;
    const newValue: string = JSON.stringify(newData)
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
