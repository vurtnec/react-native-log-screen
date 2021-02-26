import { v4 as uuidv4 } from 'uuid';

class Util {
    constructor() {

    }

    public async guid(): Promise<string> {
        return (
            await this.s4() + await this.s4() + "-" + await this.s4() + "-" + await this.s4() +
            "-" + await this.s4() + "-" + await this.s4() + await this.s4() + await this.s4()
        );
    }

    public async uuid() {
        return uuidv4();
    }

    private async s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}

export default new Util();
