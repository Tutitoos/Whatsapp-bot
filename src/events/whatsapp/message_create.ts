import { Message } from "whatsapp-web.js";
import sharp from "sharp";
import terminalImage from "../../img/terminalImage";
import { ExtendedClient, ExtendedEvent } from "../../interfaces";

export default class MessageCreate extends ExtendedEvent {
    constructor() {
        super({
            name: "message_create",
            category: "whatsapp",
            once: false,
        });
    }
    async run(client: ExtendedClient, message: Message): Promise<any> {
        console.log("MESSAGE_CREATE", message.body);
        if (!client.config.client_id.length) client.config.client_id = message.id.id;
        if (message.id.remote !== client.config.group_id) return;
        const chats = await client.getChats().catch(() => []);
        const chat: any = chats.find(
            (chatData) => chatData.id._serialized == client.config.group_id
        );
        if (!chat || !chat.isGroup) return;
        const prefix = client.config.prefix;
        if (!message.body.startsWith(prefix)) {
            try {
                const imageData = await message.downloadMedia();
                if (!imageData) return;
                let buffer = Buffer.from(imageData.data, "base64");
                if (imageData.mimetype !== "image/png") {
                    if (imageData.mimetype === "video/mp4") {
                        return message.reply(`No puedo visualizar gifs/videos!`);
                    } else {
                        buffer = await sharp(buffer).toFormat("png").toBuffer();
                    }
                }
                if (imageData && imageData.data) console.log(await terminalImage.buffer(buffer));
            } catch (error: any) {
                message.reply(
                    `Ha ocurrido un error al visualizar el archivo: ${error.message}`,
                    client.config.group_id
                );
            }
        } else {
            const args: string[] = message.body.slice(prefix.length).split(/ +/);
            const cmd = args.shift()?.toLowerCase();
            if (!cmd || !cmd.length) return;
            const command = client.commands.find((commandData) => cmd === commandData.name);
            if (!command) return console.error(`Command ${cmd} not found`);
            return command
                .run(client, message, args)
                .catch((error: Error) => {
                    console.error(error);
                    message.reply(
                        `Ha ocurrido un error al ejecutar el comando **${command.name}**`,
                        client.config.group_id
                    );
                })
                .finally(() => {
                    console.log("Mensaje enviado!");
                });
        }
    }
}
