import { CommandInteraction, GuildMemberRoleManager, SlashCommandBuilder } from "discord.js";
import { roles } from "../../constants/roles";

export default {
  data: new SlashCommandBuilder()
    .setName("acc")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option.setName("usuário").setDescription("Usuário da conta").setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("email").setDescription("Email da conta").setRequired(false)
    )
    .addStringOption((option) => option.setName("senha").setDescription("Senha da conta")),
  async execute(interaction: CommandInteraction) {
    const memberId = interaction.member?.user.id;
    const memberRoles = interaction.member?.roles as GuildMemberRoleManager;

    if (!memberRoles.cache.has(roles.owner) || !memberRoles.cache.has(roles.adm)) {
      await interaction.reply(`<@${memberId}> - Você não pode usar um comando do yuu-bot!`);

      return;
    }

    const data = interaction.options.data.filter((item) => item.value !== "0");

    await interaction.channel?.send({
      content: `
      ### Antes de qualquer coisa faça esses dois passos:

      - __Verifique se a conta é a mesma do anúncio__.
      - Se sim, acesse [hoyo.acc](https://account.hoyoverse.com/#/login?cb_route=%2Faccount%2FaccountInfo) e mude sua senha.

      _Qualquer problema ou dúvida entre em contato!_
      `.trim(),
      embeds: [
        {
          title: `Dados de acesso:`,
          description: "",
          color: 0x7159c1,
          fields: data.map((i) => ({ name: i.name, value: i.value as string, inline: true })),
        },
      ],
    });

    await interaction.reply("Pong!");
  },
};
