import { Message } from "whatsapp-web.js";
import ExtendedClient from "./ExtendedClient";
import CommandProps from "../types/Command";

export default abstract class ExtendedCommand implements CommandProps {
    name: string;
    constructor({ name }: CommandProps) {
        this.name = name;
    }
    abstract run(client: ExtendedClient, msg: Message, args: string[]): Promise<any>;
}
