import { CommandInteraction, GuildMemberRoleManager, SlashCommandBuilder } from "discord.js";
import { roles } from "../../constants/roles";

export default {
  data: new SlashCommandBuilder()
    .setName("account")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option.setName("usuário").setDescription("Usuário da conta").setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("email").setDescription("Email da conta").setRequired(false)
    )
    .addStringOption((option) => option.setName("senha").setDescription("Senha da conta")),
  async execute(interaction: CommandInteraction) {
    const options = interaction.options.data;

    const data = options.filter((item) => item.value !== "0");

    await interaction.reply({
      content: [
        "### :warning:  Verifique sua conta primeiro.",
        "",
        "Depois vincule o seu e-mail e altere a senha imediatamente por favor",
        "Não nos responsabilizamos por problemas de conta causados ​​por e-mail desvinculado",
        " ",
        "_*A partir de agora, a conta torna-se de total responsabilidade sua._",
      ].join("\n"),
      embeds: [
        {
          title: `Dados de acesso:`,
          description: "",
          color: 0x7159c1,
          fields: data.map((field) => ({
            name: field.name,
            value: field.value as string,
            inline: true,
          })),
        },
      ],
    });
  },
};
