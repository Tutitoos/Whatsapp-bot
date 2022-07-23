import { ExtendedClient, ExtendedEvent } from "../../interfaces";

export default class UncaughtException extends ExtendedEvent {
    constructor() {
        super({
            name: "uncaughtException",
            category: "node",
            once: false,
        });
    }
    async run(_client: ExtendedClient, error: Error): Promise<any> {
        console.error(error.stack || error.message);
        return 0;
    }
}
