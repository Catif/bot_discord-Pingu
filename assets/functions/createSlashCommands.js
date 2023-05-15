const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = (BOT) => {
  // ==================
  //      /help
  // ==================
  const helpCommand = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Affiche la liste des commandes");
  BOT.application.commands.create(helpCommand);

  // ==================
  //      /add-ping
  // ==================
  const addPingCommand = new SlashCommandBuilder()
    .setName("add-ping")
    .setDescription("Ajouter un utilisateur à être ping")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("L'utilisateur à ajouter à la liste des ping")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("day")
        .setDescription("Le jour de la semaine à ping l'utilisateur")
        .setRequired(true)
    );
  addPingCommand.setDefaultMemberPermissions(1);
  BOT.application.commands.create(addPingCommand);

  // ==================
  //    /remove-ping
  // ==================
  const removePingCommand = new SlashCommandBuilder()
    .setName("remove-ping")
    .setDescription("Supprimer un utilisateur de la liste d'un jour")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("L'utilisateur à ajouter à la liste des ping")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("day")
        .setDescription("Le jour de la semaine à ping l'utilisateur")
        .setRequired(true)
    );
  removePingCommand.setDefaultMemberPermissions(1);
  BOT.application.commands.create(removePingCommand);

  // ==================
  //    /reset-ping
  // ==================
  const resetPingCommand = new SlashCommandBuilder()
    .setName("reset-ping")
    .setDescription("Supprimer tous les utilisateurs de la liste");
  resetPingCommand.setDefaultMemberPermissions(1);
  BOT.application.commands.create(resetPingCommand);

  // ==================
  //  /calendrier-ping
  // ==================
  const calendrierPingCommand = new SlashCommandBuilder()
    .setName("calendrier-ping")
    .setDescription("Affiche le calendrier des ping");
  BOT.application.commands.create(calendrierPingCommand);
};
