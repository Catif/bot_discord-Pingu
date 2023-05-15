const database = require("../functions/database");

module.exports = async (BOT, interaction) => {
  console.log(interaction.user.username + " use /remove-ping");

  const userTemp = interaction.options.data.find(
    (option) => option.name === "user"
  );
  const day = interaction.options.data
    .find((option) => option.name === "day")
    .value.toLowerCase();

  if (!userTemp) {
    interaction.reply(
      "Tu as besoin de tag une personne pour la supprimer de la liste, idiot va !"
    );
    return;
  }

  if (typeof userTemp.user !== "object") {
    interaction.reply(
      "Tu as besoin de tag une personne pour la supprimer de la liste, idiot va !"
    );
    return;
  }

  const user = userTemp.user;

  if (!day) {
    interaction.reply(
      "Tu as besoin de spécifier un jour pour supprimer cette personne de la liste, idiot va !"
    );
    return;
  }

  if (
    ![
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
      "dimanche",
    ].includes(day)
  ) {
    interaction.reply("Le jour spécifié n'est pas valide, idiot va !");
    return;
  }

  // Add the user to the ping list for the specified day.
  const pingList = await database.getData();

  if (pingList[day].filter((u) => u.id === user.id).length <= 0) {
    interaction.reply(
      `L'utilisateur ${user.username} n'est pas présent sur la liste du jour ${day}.`
    );
    return;
  }

  // Prendre tout le monde sauf l'utilisateur ping
  pingList[day] = pingList[day].reduce((acc, cur, i) => {
    if (cur.id !== user.id) {
      acc.push(cur);
    }
    return acc;
  }, []);

  database.setData(pingList);

  interaction.reply(
    `L'utilisateur ${user.username} a bien été supprimé sur le jour ${day}.`
  );
};
