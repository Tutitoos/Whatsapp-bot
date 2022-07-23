import { Client, ClientOptions } from "whatsapp-web.js";
import ExtendedEvent from "./ExtendedEvent";
import ExtendedCommand from "./ExtendedCommand";
import ExtendedConfig from "./ExtendedConfig";
import Config from "../lib/Config";
import { registerEvents, registerCommands } from "../handlers";

export default class ExtendedClient extends Client {
    config: ExtendedConfig;
    events: Map<string, ExtendedEvent>;
    commands: Array<ExtendedCommand>;
    constructor(props: ClientOptions) {
        super(props);
        this.config = Config;
        this.events = new Map();
        this.commands = [];
    }
    async run(): Promise<void> {
        await registerEvents(this);
        await registerCommands(this);

        await this.initialize();
    }
}
