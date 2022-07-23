import "dotenv/config";
import { LocalAuth } from "whatsapp-web.js";
import { ExtendedClient } from "./interfaces";

let client: ExtendedClient | null = null;
try {
    client = new ExtendedClient({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true },
    });
    client.run();
} catch (error: any) {
    client = null;
    console.error("Error al iniciar el cliente: " + error.message);
    process.exit(1);
}
