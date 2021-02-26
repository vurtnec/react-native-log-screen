import LogStorage from './LogStorage'
import {Message} from '../Logger'

class LocalStorage extends LogStorage {

    public async get(callback?: Function) {


        return [];
    }

    public async set(messages: Message[], callback?: Function) {



        return [];
    }

    public async clear(callback?: Function) {



    }
}

export default LocalStorage;
