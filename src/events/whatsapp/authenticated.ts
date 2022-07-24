import { ExtendedEvent } from "../../interfaces";

export default class Authenticated extends ExtendedEvent {
    constructor() {
        super({
            name: "authenticated",
            category: "whatsapp",
            once: false,
        });
    }
    async run(): Promise<any> {
        console.error("AUTHENTICATED");
    }
}
