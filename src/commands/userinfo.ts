import { Message } from "whatsapp-web.js";
import { ExtendedClient, ExtendedCommand } from "../interfaces";

export default class Userinfo extends ExtendedCommand {
    constructor() {
        super({
            name: "userinfo",
        });
    }
    async run(client: ExtendedClient, msg: Message): Promise<any> {
        let userID: string;
        const user = await msg.getMentions();
        if (!user.length || !user[0]?.id?._serialized?.length) {
            const contact = await msg.getContact();
            userID = contact.id._serialized;
        } else {
            userID = user[0].id._serialized;
        }
        const userData = await client.getContactById(userID as any);
        const numberParsed = userData.number.slice(2);
        await msg.reply(
            `
*User info*
Username: ${userData.pushname}
My number: +${userData.number.slice(0, 2)} ${
                numberParsed.slice(0, 3) +
                " " +
                numberParsed.slice(3, 6) +
                " " +
                numberParsed.slice(6)
            }
        `,
            client.config.group_id
        );
    }
}
