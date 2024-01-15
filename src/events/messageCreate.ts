import { Client, Events } from "discord.js";

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

const masculineAdjectives = [];

export default (client: Client<boolean>) => {
  client.on(Events.MessageCreate, (interaction) => {
    if (interaction.content.toLowerCase() === "a mayu é?") {
      const randomIndex = Math.floor(Math.random() * feminineAdjectives.length);

      interaction.reply(`${feminineAdjectives[randomIndex]}(às vezes).`);
    }

    // if (["o zé é?", "o ze é?", "o ze e?"].includes(interaction.content.toLowerCase())) {
    //   const randomIndex = Math.floor(Math.random() * feminineAdjectives.length);

    //   interaction.reply(`${feminineAdjectives[randomIndex]}(às vezes).`);
    // }
  });
};
