import { Client, Events } from "discord.js";

export default (client: Client<boolean>) => {
  client.once(Events.MessageCreate, () => {});
};
