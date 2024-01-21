import { ActivityType, Client, Events } from "discord.js";
import { roles } from "../constants/roles";

import { getStatus, setStatus } from "../store/yuuStatus";
import { stat } from "fs";

const feminineAdjectives = [
  "Amável",
  "Querida",
  "Meiga",
  "Fofa",
  "Doce",
  "Encantadora",
  "Adorável",
  "Apaixonante",
  "Cuidadosa",
  "Atenciosa",
  "Simpática",
  "Afetuosa",
  "Carinhosa",
  "Fofinha",
  "Queridinha",
  "Graciosa",
  "Amorosa",
  "Charmosa",
  "Cheirosa",
  "Delicada",
  "Encantadora",
  "Generosa",
  "Sorridente",
  "Alegre",
  "Radiante",
  "Brilhante",
  "Paciente",
  "Sábia",
  "Harmoniosa",
  "Iluminada",
  "Especial",
  "Divina",
  "Serenata",
  "Tranquila",
  "Divertida",
  "Paz",
  "Branda",
  "Celestial",
  "Pura",
  "Gentil",
  "Sonhadora",
  "Deslumbrante",
  "Doce",
  "Pacífica",
  "Polida",
  "Perfeita",
  "Serena",
];

const adjectives = [
  "alegre",
  "brilhante",
  "cativante",
  "delicioso",
  "encantador",
  "fascinante",
  "gracioso",
  "harmonioso",
  "inovador",
  "jovial",
  "kaleidoscópico",
  "luminoso",
  "maravilhoso",
  "notável",
  "ousado",
  "poderoso",
  "quente",
  "radiante",
  "sedutor",
  "tranquilo",
  "único",
  "vibrante",
  "wonderful",
  "xistoso",
  "youthful",
  "zeloso",
  "afetuoso",
  "bondoso",
  "cintilante",
  "diligente",
  "efervescente",
  "fabuloso",
  "genuíno",
  "hospitaleiro",
  "impressionante",
  "jubiloso",
  "karma-free",
  "leal",
  "magnífico",
  "nurturing",
  "ousado",
  "pacífico",
  "quimicamente puro",
  "radiante",
  "sábio",
  "transparente",
  "único",
  "vivaz",
  "wholesome",
  "xenial",
  "young-at-heart",
  "zestful",
  "admirável",
  "bravo",
  "criativo",
  "determinado",
  "empolgante",
  "fenomenal",
  "generoso",
  "hilariante",
  "inspirador",
  "jubilante",
  "kármico",
  "luminoso",
  "maravilhoso",
  "nurturing",
  "otimista",
  "poderoso",
  "quente",
  "radiante",
  "sábio",
  "tranquilo",
  "único",
  "vibrante",
  "wholesome",
  "xenial",
  "young-at-heart",
  "zeloso",
];

export default (client: Client<boolean>) => {
  client.on(Events.MessageCreate, async (interaction) => {
    const isYuu = interaction.member?.roles.cache.has(roles.adm);

    const memberName = interaction.member?.user.username;
    const messageContent = interaction.content;

    if (isYuu) {
      const status = getStatus();

      if (status !== "on") {
        setStatus("on");
      }
    }

    // console.log(`${memberName}: ${messageContent}`);

    if (interaction.content.includes("<@814142267719680011>")) {
      const status = getStatus();

      const statusMessageHandler = {
        sleeping: "dormindo",
        afk: "afk",
      };

      if (status !== "on") {
        await interaction.reply(`O Yuu está atualmente: ${statusMessageHandler[status]}`);
      }
    }

    // if (interaction.content.toLowerCase() === "!" && isYuu) {
    //   await interaction.delete();

    //   await interaction.channel.send(
    //     "https://i.pinimg.com/originals/6b/bb/a4/6bbba4f581dd3373d683e144f5153bb7.jpg"
    //   );

    //   interaction.channel.send({
    //     embeds: [
    //       {
    //         title: "teste",
    //       },
    //     ],
    //     components: [
    //       {
    //         type: 1,
    //         components: [
    //           {
    //             style: 1,
    //             label: `Participar`,
    //             custom_id: `giveaway_button`,
    //             disabled: false,
    //             type: 2,
    //             emoji: {
    //               name: `🎁`,
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   });
    // }

    // if (interaction.content.toLowerCase() === "a mayu é?") {
    //   const randomIndex = Math.floor(Math.random() * feminineAdjectives.length);

    //   interaction.reply(`${feminineAdjectives[randomIndex]}(às vezes).`);

    //   return;
    // }

    if (interaction.content.toLocaleLowerCase() === "eu sou?") {
      const randomIndex = Math.floor(Math.random() * adjectives.length);

      interaction.reply(adjectives[randomIndex]);

      return;
    }
  });
};
