import { ExtendedClient, ExtendedEvent } from "../../interfaces";

export default class Authenticated extends ExtendedEvent {
    constructor() {
        super({
            name: "authenticated",
            category: "whatsapp",
            once: false,
        });
    }
    async run(_client: ExtendedClient): Promise<any> {
        console.error("AUTHENTICATED");
    }
}
