import "./env";

import { Client, Events, GatewayIntentBits, Message, Partials } from "discord.js";
import formatCurrency from "./utils/formatCurrency";
import isAdmin from "./utils/isAdmin";

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
    if (!isAdmin(message.member)) {
      await message.reply("Você não pode usar esse comando do yuu-bot!");

      return;
    }

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
      await message.reply("Você não pode usar esse comando do yuu-bot!");

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

// import fs from "node:fs";
// import path from "node:path";
// import {
//   ActivityType,
//   Client,
//   Collection,
//   Events,
//   GatewayIntentBits,
//   REST,
//   Routes,
// } from "discord.js";

// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.commands = new Collection();
// const foldersPath = path.join(__dirname, "commands");
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
//   const commandsPath = path.join(foldersPath, folder);
//   const commandFiles = fs.readdirSync(commandsPath);

//   for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath).default;

//     if ("data" in command && "execute" in command) {
//       client.commands.set(command.data.name, command);
//     } else {
//       console.log(
//         `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//       );
//     }
//   }
// }

// const commands = [];

// const foldersPath = path.join(__dirname, "commands");
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
//   const commandsPath = path.join(foldersPath, folder);
//   const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts"));

//   for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath).default;

//     if ("data" in command && "execute" in command) {
//       commands.push(command.data.toJSON());
//       client.commands.set(command.data.name, command);
//     } else {
//       console.log(
//         `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//       );
//     }
//   }
// }

// const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

// (async () => {
//   try {
//     console.log(`Started refreshing ${commands.length} application (/) commands.`);

//     const data = (await rest.put(
//       Routes.applicationGuildCommands(
//         process.env.DISCORD_CLIENT_ID!,
//         process.env.DISCORD_GUILD_ID!
//       ),
//       {
//         body: commands,
//       }
//     )) as any[];

//     console.log(`Successfully reloaded ${data.length} application (/) commands.`);
//   } catch (error) {
//     console.error(error);
//   }
// })();

// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;
//   const command = interaction.client.commands.get(interaction.commandName);

//   if (!command) {
//     console.error(`No command matching ${interaction.commandName} was found.`);
//     return;
//   }

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     if (interaction.replied || interaction.deferred) {
//       await interaction.followUp({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     } else {
//       await interaction.reply({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     }
//   }
// });

// client.once(Events.ClientReady, () => {
//   client?.user?.setActivity("KASDKAs", { type: ActivityType.Listening });
// });

// client.login(process.env.DISCORD_TOKEN);

export { client };
