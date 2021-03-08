import LogStorage from './LogStorage'
import {Message} from '../Logger'

class Memory extends LogStorage {

    private data: Message[]

    constructor() {
        super();
        this.data = []
    }

    public async get(callback?: Function) {
        if(callback) {
            await callback()
        }
        return this.data;
    }

    public async set(messages: Message[], callback?: Function) {
        const newData = this.data.concat( messages);
        if(callback) {
            await callback()
        }
        return this.data = newData;
    }

    public async clear(callback?: Function) {
        this.data = [];
        if(callback) {
            await callback()
        }
    }
}

export default Memory;
