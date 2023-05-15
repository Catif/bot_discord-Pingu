const database = require("../functions/database");

module.exports = async (BOT, interaction) => {
  console.log(interaction.user.username + " use /add-ping");

  const userTemp = interaction.options.data.find(
    (option) => option.name === "user"
  );
  const day = interaction.options.data
    .find((option) => option.name === "day")
    .value.toLowerCase();

  if (!userTemp) {
    interaction.reply(
      "Tu as besoin de tag une personne pour l'ajouter à la liste, idiot va !"
    );
    return;
  }

  if (typeof userTemp.user !== "object") {
    interaction.reply(
      "Tu as besoin de tag une personne pour l'ajouter à la liste, idiot va !"
    );
    return;
  }

  const user = userTemp.user;

  if (!day) {
    interaction.reply(
      "Tu as besoin de spécifier un jour pour ajouter la personne à la liste, idiot va !"
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

  if (pingList[day].filter((u) => u.id === user.id).length > 0) {
    interaction.reply(
      `L'utilisateur ${user.username} est déjà sur la liste du jour ${day}.`
    );
    return;
  }

  pingList[day].push(user);
  database.setData(pingList);

  interaction.reply(
    `L'utilisateur ${user.username} a bien été ajouté sur le jour ${day}.`
  );
};
