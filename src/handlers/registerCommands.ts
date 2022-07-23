import fs from "fs";
import { ExtendedClient } from "../interfaces";

export default async function registerCommands(client: ExtendedClient): Promise<void> {
    const items: {
        all: number;
        includes: { name: string; category: string }[];
        excludes: { name: string; category: string }[];
    } = { all: 0, includes: [], excludes: [] };
    const files: string[] = [];
    fs.readdirSync(`${__dirname}/../commands`)
        .filter((file: string) => file.endsWith(".ts") || file.endsWith(".js"))
        .forEach((file: string) => files.push(`${__dirname}/../commands/${file}`));
    items.all = files.length;
    for (const file of files) {
        try {
            const commandAsync = await import(file);
            const command = new commandAsync.default();
            if (command.name.length > 0) {
                client.commands.push(command);
                items.includes.push({
                    name: command.name,
                    category: command.category || "unknown",
                });
            } else {
                items.excludes.push({
                    name: command.name,
                    category: command.category || "unknown",
                });
            }
        } catch {
            items.excludes.push({
                name: file.slice(file.lastIndexOf("/") + 1, file.length - 3),
                category: "unknown",
            });
        }
    }
    console.log(`Comandos: ${items.includes.length} / ${items.all}`);
    if (items.includes.length !== items.all) {
        console.error(
            `Error al cargar los comandos: ${items.excludes
                .map((command: { name: string; category: string }) => command.name)
                .join(", ")}`
        );
    }
}
