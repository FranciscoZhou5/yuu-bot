import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import formatCurrency from "../../utils/formatCurrency";

import { sellers as sellersHandler } from "../../constants/sellers";

export default {
  data: new SlashCommandBuilder()
    .setName("pix")
    .setDescription("Enviar pix de algum vendedor.")
    .addStringOption((option) =>
      option
        .setName("vendedor")
        .setDescription("Usuário da conta")
        .setRequired(true)
        .addChoices(
          { name: "Yuu", value: "yuu" },
          { name: "Wild", value: "wild" },
          { name: "Zé", value: "ze" }
        )
    )
    .addStringOption((option) =>
      option.setName("cliente").setDescription("Cliente a ser mencionado").setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName("valor").setDescription("Valor da negociação").setRequired(false)
    ),
  async execute(interaction: CommandInteraction) {
    const options = interaction.options.data;

    const price = options.find((opt) => opt.name === "valor");
    const customer = options.find((opt) => opt.name === "cliente")?.value;
    const seller = options.find((opt) => opt.name === "vendedor")?.value as "yuu" | "wild" | "ze";

    const data = sellersHandler[seller];

    await interaction.reply({
      content: `${customer} ${
        price ? `Seu total ficou em: __${formatCurrency(price.value as number)}__` : ""
      }`,
      embeds: [
        {
          title: `Finalizar pagamento`,
          description: "",
          color: 0x7159c1,
          fields: [
            {
              name: `Chave ${data.type}`,
              value: data.code,
              inline: true,
            },
            {
              name: "Nome do beneficiário",
              value: data.name,
              inline: true,
            },
          ],
        },
      ],
    });
  },
};
