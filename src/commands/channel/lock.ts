import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("lock").setDescription("Bloquear canal"),
  async execute(interaction: CommandInteraction) {
    interaction.reply("Locked! __[FEATURE IN TEST MODE]__");
  },
};
