import { ActivityType, Client, Events } from "discord.js";

import chalk from "chalk";

import schedule from "node-schedule";

export default (client: Client<boolean>) => {
  client.once(Events.ClientReady, () => {
    console.log(`${chalk.cyan("info")} Bot ready and logged in as ${client?.user?.tag}!`);

    client?.user?.setPresence({
      status: "online",
      activities: [{ name: "o circo pegar fogo", type: ActivityType.Watching }],
    });

    // const rule = new schedule.RecurrenceRule();
    // rule.tz = "America/Sao_Paulo";
    // rule.hour = 9;
    // rule.minute = 30;

    // const channelId = "1187454858941452400";

    // const job = schedule.scheduleJob(rule, () => {
    //   const channel = client.channels.cache.get(channelId);

    //   if (channel) {
    //     if (channel.isTextBased()) {
    //       channel.send("Bom dia!");
    //     }

    //     job.cancel();
    //   }
    // });
  });
};
