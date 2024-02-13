import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("code")
    .setDescription("Enviar os códigos com os links de resgate"),
  async execute(interaction: CommandInteraction) {
    interaction.reply("__[FEATURE IN TEST MODE]__");
  },
};
