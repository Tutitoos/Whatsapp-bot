import { ExtendedClient, ExtendedEvent } from "../../interfaces";

export default class Disconnected extends ExtendedEvent {
    constructor() {
        super({
            name: "disconnected",
            category: "whatsapp",
            once: false,
        });
    }
    async run(_client: ExtendedClient, reason: string): Promise<any> {
        console.log("Cliente ha cerrado sessión", reason);
    }
}
