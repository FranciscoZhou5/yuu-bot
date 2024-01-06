"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const discord_js_1 = require("discord.js");
function formatCurrency(curreny) {
    return curreny.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
}
function isAdmin(member) {
    return (member === null || member === void 0 ? void 0 : member.roles.cache.has(roles.owner)) || (member === null || member === void 0 ? void 0 : member.roles.cache.has(roles.adm));
}
const roles = {
    owner: "1187467037031792690",
    adm: "1187552734723969064",
    serverBooster: "1188199887305723905",
    vipClient: "1187804174348464220",
};
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
    ],
    partials: [discord_js_1.Partials.Channel],
});
client.on("ready", () => {
    var _a;
    console.log(`Logged in as ${(_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
client.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield message.delete();
        yield message.channel.send({
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
            yield message.reply("Você não tem permissão para usar comandos do yuu-bot.");
            return;
        }
        const command = message.content.split(" ").slice(0, 1);
        const mention = message.content.split(" ")[2];
        const price = message.content.split(" ")[3];
        if (!mention) {
            yield message.reply("Erro de comando! Adicione o atributo _@Usuário_:" + " `" + command + " @Usuario" + "`");
            return;
        }
        if (!mention.startsWith("<@") && !mention.endsWith(">")) {
            yield message.reply("Erro ao obter o @ do usuário");
            return;
        }
        // const member = message.guild?.members.cache.get(mention.slice(2, -1));
        const total = +price;
        yield message.channel.send({
            content: `${mention} ${price ? `- Seu total ficou em: __**${formatCurrency(total)}**__` : ""}`,
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
        yield message.delete();
    }
}));
client.login(process.env.DISCORD_TOKEN);
