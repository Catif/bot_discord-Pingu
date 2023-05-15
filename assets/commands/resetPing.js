const database = require("../functions/database");

module.exports = async (BOT, interaction) => {
  console.log(interaction.user.username + " use /reset-ping");

  database.setData({
    lundi: [],
    mardi: [],
    mercredi: [],
    jeudi: [],
    vendredi: [],
    samedi: [],
    dimanche: [],
  });

  interaction.reply(
    `La liste des pings de la semaine on bien été remis à zéro.`
  );
};
