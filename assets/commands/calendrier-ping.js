const { EmbedBuilder } = require("discord.js");
const database = require("../functions/database");

module.exports = (BOT, interaction) => {
  console.log(interaction.user.username + " use /calendrier-ping");

  const pingList = database.getData();

  let pingListCalendrier = "";
  const days = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const dayPingList = pingList[day];

    if (dayPingList) {
      pingListCalendrier += `**${day}** : ${dayPingList
        .map((u) => u.username)
        .join(", ")}\n`;
    } else {
      pingListCalendrier += `**${day}** : Aucun ping\n`;
    }
  }

  let embed = new EmbedBuilder()
    .setColor(0x1b1d31)
    .setTitle("Voici le calendrier des pings :")
    .setThumbnail(BOT.user.displayAvatarURL())
    .setDescription(pingListCalendrier)
    .setTimestamp();

  interaction.reply({
    embeds: [embed],
  });
};
