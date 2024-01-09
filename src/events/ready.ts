import { client } from "../index";
import { ActivityType, Events } from "discord.js";

client.once(Events.ClientReady, () => {
  client?.user?.setActivity("KASDKAs", { type: ActivityType.Listening });
});
