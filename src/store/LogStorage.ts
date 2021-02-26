import {Message} from '../Logger'

abstract class LogStorage {

    abstract async get(callBack?: Function): Promise<Message[] | []>;

    abstract async set(messages: Message[], callBack?: Function): Promise<Message[] | []>;

    abstract async clear(callBack?: Function): Promise<void>;

}

export default LogStorage;
