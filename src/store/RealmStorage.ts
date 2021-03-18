import Realm from 'realm'
import LogStorage from './LogStorage'
import { Message } from '../model/Logger'

class RealmStorage extends LogStorage<Message> {
  private data: Message[] = []

  private MessageSchema = {
    name: 'RealmStorage',
    properties: {
      message: 'string',
      timestamp: { type: 'date' },
      lengthAtInsertion: 'int',
      id: 'string',
      level: 'string',
      color: 'string'
    }
  }

  // private realm:Realm;
  public constructor() {
    super()
    // this.realm = new Realm({schema: [MessageSchema]});
  }

  public async get(callback?: Function): Promise<Message[] | []> {
    if (callback) {
      await callback()
    }
    console.log('get')
    Realm.open({ schema: [this.MessageSchema] }).then(realm => {
      const queryAllResult = realm.objects('RealmStorage').toJSON()
      console.log(queryAllResult)
      //   return JSON.parse(queryAllResult)
    })
    return []
  }

  public async set(messages: Message[], callback?: Function): Promise<Message[] | []> {
    if (callback) {
      await callback()
    }
    console.log('set')
    console.log(messages)
    await Realm.open({ schema: [this.MessageSchema] }).then(realm => {
      realm.write(() => {
        realm.create('RealmStorage', messages)
      })
    })
    return []
  }

  public async clear(callback?: Function): Promise<void> {
    if (callback) {
      await callback()
    }
    await Realm.open({ schema: [this.MessageSchema] }).then(realm => {
      realm.deleteAll
    })
  }
}

export default RealmStorage
