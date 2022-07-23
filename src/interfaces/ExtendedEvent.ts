import ExtendedClient from "./ExtendedClient";
import EventProps from "../types/Event";

export default abstract class ExtendedEvent implements EventProps {
    name: string;
    category: string;
    once: boolean;
    constructor({ name, category, once }: EventProps) {
        this.name = name;
        this.category = category;
        this.once = once;
    }
    abstract run(client: ExtendedClient, ...args: any): Promise<any>;
}
