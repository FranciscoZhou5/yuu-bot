import { ActivityType, Client, Events, InteractionType, MessageType } from "discord.js";
import { roles } from "../constants/roles";

import { getStatus, setStatus } from "../store/yuuStatus";
import { stat } from "fs";

export default (client: Client<boolean>) => {
  client.on(Events.MessageCreate, async (interaction) => {
    const yuuId = "814142267719680011";
    const botId = "1173254805196652694";

    if (interaction.type === MessageType.Reply) {
      const repliedMessage = interaction.channel.messages.cache.get(
        interaction.reference?.messageId as string
      );

      if (repliedMessage?.author.id === yuuId && interaction.author.id !== botId) {
        const messageAuthor = interaction.author.username;

        console.log(`${messageAuthor} respondeu a sua mensagem com "${interaction.content}"`);

        // const yuu = interaction.guild?.members.cache.get(yuuId);

        await interaction.reply(
          "Yuu está atualmente: **Inativo**. Se você precisa de alguma ajuda, chame algum moderador!"
        );
      }
    }

    // if (isYuu) {
    //   const status = getSta tus();

    //   if (status !== "on") {
    //     setStatus("on");
    //   }
    // }

    if (interaction.content.includes("<@814142267719680011>")) {
      // const status = getStatus();
      // const statusMessageHandler = {
      //   sleeping: "dormindo",
      //   afk: "afk",
      // };
      // if (status !== "on") {
      //   await interaction.reply(`O Yuu está atualmente: ${statusMessageHandler[status]}`);
      // }

      await interaction.reply(
        "Yuu está atualmente: **Inativo**. Se você precisa de alguma ajuda, chame algum moderador!"
      );
    }
  });
};
