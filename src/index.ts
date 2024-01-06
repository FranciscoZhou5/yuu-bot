import { config } from "dotenv";
config();

import { Client, Events, GatewayIntentBits, Message, Partials } from "discord.js";

function formatCurrency(curreny: number) {
  return curreny.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

function isAdmin(member: Message<boolean>["member"]) {
  return member?.roles.cache.has(roles.owner) || member?.roles.cache.has(roles.adm);
}

const roles = {
  owner: "1187467037031792690",
  adm: "1187552734723969064",
  serverBooster: "1188199887305723905",
  vipClient: "1187804174348464220",
};

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildIntegrations,
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.startsWith("!acc")) {
    const values = message.content.split(" ").slice(1);

    const accData = values.map((item) => {
      if (item.startsWith("username:")) {
        return { value: item.replace("username:", ""), type: "Username" };
      }

      if (item.startsWith("email:")) {
        return { value: item.replace("email:", ""), type: "Email" };
      }

      return { value: item, type: "Senha" };
    });

    await message.delete();

    await message.channel.send({
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
          fields: accData.map((i) => ({ name: i.type, value: i.value, inline: true })),
        },
      ],
    });

    return;
  }

  const isYuuCommand = message.content.startsWith("!yuu pix");
  const isWildCommand = message.content.startsWith("!wild pix");

  if (isYuuCommand || isWildCommand) {
    if (!isAdmin(message.member)) {
      await message.reply("Você não tem permissão para usar comandos do yuu-bot.");

      return;
    }

    const command = message.content.split(" ").slice(0, 1);
    const mention = message.content.split(" ")[2];
    const price = message.content.split(" ")[3];

    if (!mention) {
      await message.reply(
        "Erro de comando! Adicione o atributo _@Usuário_:" + " `" + command + " @Usuario" + "`"
      );

      return;
    }

    if (!mention.startsWith("<@") && !mention.endsWith(">")) {
      await message.reply("Erro ao obter o @ do usuário");

      return;
    }

    // const member = message.guild?.members.cache.get(mention.slice(2, -1));
    const total = +price;

    await message.channel.send({
      content: `${mention} ${
        price ? `- Seu total ficou em: __**${formatCurrency(total)}**__` : ""
      }`,
      embeds: [
        {
          title: `Finalizar pagamento`,
          description: "",
          color: 0x00ffff,
          fields: [
            {
              name: isYuuCommand ? "**Chave Email**" : "**Chave CPF**",
              value: isYuuCommand ? "franciscozliu@gmail.com" : "06206495000",
              inline: true,
            },
            {
              name: `Nome do beneficiário`,
              value: isYuuCommand ? `Francisco Zhou Liu` : "Flavio Liu Zhang",
              inline: true,
            },
          ],
        },
      ],
    });

    await message.delete();
  }
});

client.login(process.env.DISCORD_TOKEN);
