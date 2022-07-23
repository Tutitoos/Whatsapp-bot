import fs from "fs";
import { ExtendedClient } from "../interfaces";

export default async function registerEvents(client: ExtendedClient): Promise<void> {
    const items: {
        all: number;
        includes: { name: string; category: string }[];
        excludes: { name: string; category: string }[];
    } = { all: 0, includes: [], excludes: [] };
    const files: string[] = [];
    fs.readdirSync(`${__dirname}/../events`).forEach((category: string) => {
        fs.readdirSync(`${__dirname}/../events/${category}`)
            .filter((file: string) => file.endsWith(".ts") || file.endsWith(".js"))
            .forEach((file: string) => files.push(`${__dirname}/../events/${category}/${file}`));
    });
    items.all = files.length;
    for (const file of files) {
        try {
            const eventAsync = await import(file);
            const event = new eventAsync.default();
            if (event.name.length > 0) {
                client.events.set(event.name, event);
                switch (event.category) {
                    case "whatsapp":
                        if (event.once) {
                            client.once(event.name, event.run.bind(null, client));
                        } else {
                            client.on(event.name, event.run.bind(null, client));
                        }
                        break;
                    case "node":
                        process.on(event.name, event.run.bind(null, client));
                        break;
                    default:
                        break;
                }
                items.includes.push({
                    name: event.name,
                    category: event.category || "unknown",
                });
            } else {
                items.excludes.push({
                    name: event.name,
                    category: event.category || "unknown",
                });
            }
        } catch (e) {
            console.error("Error", e);
            items.excludes.push({
                name: file.slice(file.lastIndexOf("/") + 1, file.length - 3),
                category: "unknown",
            });
        }
    }
    console.log(`Eventos: ${items.includes.length} / ${items.all}`);
    if (items.includes.length !== items.all) {
        console.error(
            `Error al cargar los eventos: ${items.excludes
                .map((command: { name: string; category: string }) => command.name)
                .join(", ")}`
        );
    }
}
