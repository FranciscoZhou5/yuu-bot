import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Status, setStatus } from "../../store/yuuStatus";

export default {
  data: new SlashCommandBuilder()
    .setName("set")
    .setDescription("Set Status")
    .addStringOption((option) =>
      option
        .setName("status")
        .setDescription("Status")
        .setRequired(true)
        .addChoices({ name: "Dormindo", value: "sleeping" }, { name: "AFK", value: "afk" })
    ),
  async execute(interaction: CommandInteraction) {
    const options = interaction.options.data;

    const status = options[0].value as Status;

    setStatus(status);

    interaction.reply(`Set your status to: ${status}`);
  },
};
