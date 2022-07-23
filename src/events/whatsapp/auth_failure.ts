import { ExtendedClient, ExtendedEvent } from "../../interfaces";

export default class AuthFailure extends ExtendedEvent {
    constructor() {
        super({
            name: "auth_failure",
            category: "whatsapp",
            once: false,
        });
    }
    async run(_client: ExtendedClient, message: string): Promise<any> {
        console.error("AUTHENTICATION FAILURE", message);
    }
}
