import { ExtendedEvent } from "../../interfaces";

export default class Ready extends ExtendedEvent {
    constructor() {
        super({
            name: "ready",
            category: "whatsapp",
            once: true,
        });
    }
    async run(): Promise<any> {
        console.clear();
        console.log("Cliente ha iniciado sessión");
    }
}
