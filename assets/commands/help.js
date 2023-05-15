const { EmbedBuilder } = require("discord.js");

module.exports = (BOT, interaction) => {
  console.log(interaction.user.username + " use /help");

  let embed = new EmbedBuilder()
    .setColor(0x1b1d31)
    .setTitle("Voici la liste des commandes :")
    .setThumbnail(BOT.user.displayAvatarURL())
    .addFields(
      { name: "/help", value: "Affiche la liste des commandes." },
      {
        name: "/calendrier-ping",
        value: "Affiche le calendrier des pings de la semaine.",
      },
      { name: "----------", value: " " },
      { name: "Modérateur", value: " " },
      {
        name: "/add-ping `utilisateur` `jour`",
        value: "Ajouter un utilisateur à la liste des ping.",
      },
      {
        name: "/remove-ping `utilisateur` `jour`",
        value: "Supprimer un utilisateur à la liste des ping.",
      },
      {
        name: "/reset-ping",
        value: "Vider la liste des pings.",
      }
    )
    .setTimestamp();
  interaction.reply({
    embeds: [embed],
  });
};
