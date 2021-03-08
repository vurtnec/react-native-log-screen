// import { AppState } from "react-native";
import Constant from "./Constant";
import Memory from './store/Memory'
import LogStorage from "./store/LogStorage";
import _ from 'lodash';
import moment from "moment";
import Util from './Util'

interface LoggerOptions {
    logToConsole: boolean;
    logToConsoleFunc: Function;
}

export interface Message {
    message: string;
    timestamp: moment.Moment;
    lengthAtInsertion: number;
    id: string;
    level: string;
    color: string;
}

class Logger {

    private options: LoggerOptions;

    private storage: LogStorage;

    private appStartRendered: boolean;

    private messages: Message[];

    private listeners: Function[];

    constructor() {
        this.options = {
            logToConsole: false,
            logToConsoleFunc: () => {}
        }
        this.storage = new Memory();

        this.appStartRendered = false;

        this.messages = [];

        this.listeners = [];

        // AppState.addEventListener(
        //     "change",
        //     this._handleAppStateChange.bind(this)
        // );
    }

    public async init(storage?: any, options?: object) {
        if (options) {
            this.options = {
                ...this.options,
                ...options,
            };
        }
        if (storage) {
            this.storage = storage;
        }

        await this.initialMessage();

        await this.insertAppStartMessage()
    }

    private async logToConsole(level: string, color: string, ...messages: any): Promise<void> {
        if (this.options.logToConsole) {
            if(this.options.logToConsoleFunc) {
                this.options.logToConsoleFunc(level, color, messages);
            }else {
                let availableConsoleLogs =  ["log", "info", "debug", "error", "warn"];
                let consoleLogFunc = availableConsoleLogs.find(avCL => avCL === level.toLowerCase()) || "log";
                // @ts-ignore
                console[consoleLogFunc](...messages);
            }
        }
    }

    protected async initialMessage() {
        const messages = await this.storage.get();
        if (!_.isEmpty(messages)) {
            this.messages = _.concat(this.messages, messages);
        }
        this.sortMessage();
    }

    private sortMessage() {
        this.messages.sort((left, right) => {
            let dateDiff = moment.utc(right.timestamp).diff(moment.utc(left.timestamp));
            if (dateDiff === 0) {
                return right.lengthAtInsertion - left.lengthAtInsertion;
            }
            return dateDiff;
        });
    }

    protected async insertAppStartMessage() {
        if (!this.appStartRendered) {
            // await this.postLog([APP_START_LOG_MESSAGE]);
            this.appStartRendered = true;
        }
    }

    public async clear() {
        this.messages = [];
        await this.storage.clear();
    }

    private async parseMessageToString(message: any): Promise<string> {
        if (typeof message === "string") {
            return message;
        } else if(message instanceof String) {
            return message.toString();
        } else {
            
            return message.toString();
            // let dataAsString = stringify(message, null, "  "); //FYI: spaces > tabs
            // if (dataAsString && dataAsString.length > 12000) {
            //     dataAsString =
            //         dataAsString.substring(0, 12000) +
            //         "...(Cannot display more Logs)";
            // }
            // return dataAsString;
        }
    }


    private async _log(level: string, color: string, ...messages: any): Promise<void> {

        await this.logToConsole(level, color, messages);

        let formattedMessages =  await this.buildFormattedMessage(level, color, ...messages)
        // if (!this.messages.length) {
        //     await this.insertAppStartMessage();
        // }
        await this.postLog(formattedMessages);

        // console.log("formatted message")
        // console.log(formattedMessages)
    }


    private async buildFormattedMessage(level: string, color: string, ...messages: any): Promise<Message[]> {
        if( typeof messages === "string" || typeof messages === "object"){
            return await this.buildMessageObject(level, color, messages);
        }

        let formattedMessages =  await messages.map(await (async (message: string): Promise<Message> => {
            let newId:string = await Util.uuid();
            let parseMessage:string = await this.parseMessageToString(message);
            return {
                id: newId,
                lengthAtInsertion: this.messages.length,
                level,
                message: parseMessage,
                timestamp: moment(),
                color,
            }}))();
            console.log("returned...")
        return await formattedMessages;
    }

    private async buildMessageObject(level: string, color: string, ...messages: any ): Promise<Message[]>{
        let newId:string = await Util.uuid();
        let parseMessage:string = await this.parseMessageToString(messages);
        return [{
            id: newId,
            lengthAtInsertion: this.messages.length,
            level,
            message: parseMessage,
            timestamp: moment(),
            color,
        }];
    }

    private async postLog(formattedMessages: Message[]) {
        this.messages = await formattedMessages.concat(this.messages);
        await this.insertToStorage(this.messages);
        await this.emitMessageChanged(this.messages);
    }

    public async registerEmitChangedListener(listener: Function) {
        this.listeners.push(listener);
        listener(this.messages);
        return () => {
            const i = this.listeners.indexOf(listener);
            if (i !== -1) {
                this.listeners.splice(i, 1);
            }
        };
    }

    public async getStorage(){
        const storage = await this.storage.get();
        return storage
    }
    public async emitMessageChanged(messages: Message[]) {
        this.listeners.forEach(listener => listener(messages));
    }

    private async insertToStorage(formattedMessages: Message[]): Promise<void> {
       await this.storage.set(formattedMessages);
    }

    public async info(...messages: any): Promise<void> {
        return await this._log(Constant.LOG_LEVEL.INFO, Constant.COLOR.INFO, ...messages)
    }

    public async debug(...messages: any): Promise<void> {
        return await this._log(Constant.LOG_LEVEL.DEBUG, Constant.COLOR.DEBUG, ...messages)
    }

    public async log(...messages: any): Promise<void> {
        return await this._log(Constant.LOG_LEVEL.LOG, Constant.COLOR.LOG, ...messages)
    }

    public async warn(...messages: any): Promise<void> {
        return await this._log(Constant.LOG_LEVEL.WARN, Constant.COLOR.WARN, ...messages)
    }

    public async error(...messages: any): Promise<void> {
        return await this._log(Constant.LOG_LEVEL.ERROR, Constant.COLOR.ERROR, ...messages)
    }

}

export default Logger;
