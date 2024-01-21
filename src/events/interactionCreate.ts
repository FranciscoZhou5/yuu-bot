import { ActivityType, Client, Events } from "discord.js";

export default (client: Client<boolean>) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
      console.log(interaction.customId);
      console.log(interaction.member?.user.username);

      await interaction.reply({ content: `<@${interaction.member?.user.id}>`, ephemeral: true });

      return;
    }

    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  });
};
