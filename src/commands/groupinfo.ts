import { Message } from "whatsapp-web.js";
import { ExtendedClient, ExtendedCommand } from "../interfaces";

export default class Groupinfo extends ExtendedCommand {
    constructor() {
        super({
            name: "groupinfo",
        });
    }
    async run(client: ExtendedClient, msg: Message): Promise<any> {
        const chats = await client.getChats().catch(() => []);
        const chat: any = chats.find(
            (chatData) => chatData.id._serialized == client.config.group_id
        );
        if (!chat) {
            throw new Error(`Group ${client.config.group_id} does not exist`);
        }
        await msg.reply(
            `
*Group info*
Name: ${chat.name}
Description: ${chat.description || ""}
Created At: ${new Date(chat.createdAt.toString()).toLocaleString("fr-FR", {
                timeZone: "Europe/Madrid",
            })}
Participants: ${chat.participants.length}
        `,
            client.config.group_id
        );
    }
}
