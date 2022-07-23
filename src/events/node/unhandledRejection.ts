import { ExtendedClient, ExtendedEvent } from "../../interfaces";

export default class UnhandledRejection extends ExtendedEvent {
    constructor() {
        super({
            name: "unhandledRejection",
            category: "node",
            once: false,
        });
    }
    async run(_client: ExtendedClient, error: Error): Promise<any> {
        console.error(error.stack || error.message);
        return 0;
    }
}
