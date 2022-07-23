import qrcode from "qrcode-terminal";
import { ExtendedClient, ExtendedEvent } from "../../interfaces";

export default class Qr extends ExtendedEvent {
    constructor() {
        super({
            name: "qr",
            category: "whatsapp",
            once: true,
        });
    }
    async run(_client: ExtendedClient, qr: string): Promise<any> {
        console.log("QR RECEIVED");
        qrcode.generate(qr, { small: true });
    }
}
