import LogStorage from './LogStorage'
import {Message} from '../Logger'



class LocalStorage extends LogStorage {
    public  localStorageKey:string = "appLog";
    private data: Message[] = [];
    
    public constructor() {
        super();
      }

    public async get(callback?: Function) {
        if(callback){
            await callback;
        }
        const datas = localStorage.getItem(this.localStorageKey) || '{}';
        return JSON.parse(datas)
    }

    public async set(messages: Message[], callback?: Function) {
        if(callback){
            await callback;
        }
        const newValue:string = JSON.stringify(this.data.concat(messages));
        localStorage.setItem(this.localStorageKey, newValue);
        return JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
    }

    public async clear(callback?: Function) {
        if(callback){
            await callback;
        }
        localStorage.removeItem(this.localStorageKey);
        this.data = [];
    }

}

export default LocalStorage;
