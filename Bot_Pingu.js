// Déclaration de variable
require("dotenv").config();
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const BOT = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const schedule = require("node-schedule");

BOT.on("ready", () => {
  console.log("BOT opérationnel");
  BOT.user.setPresence({
    activities: [
      {
        name: "/help",
        type: ActivityType.Listening,
      },
    ],
    status: "online",
  });

  // (Second) (Minute) (Hour) (Day) (Month) (Day of Week) --> 0 0 6 * * * --> Se lance tous les jours à 6h00:00s
  const job = schedule.scheduleJob("0 0 17 * * *", () => {
    require("./assets/functions/pingUser")(BOT, "931626736905494538");
  });

  require("./assets/functions/createSlashCommands")(BOT);
});

BOT.on("interactionCreate", (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "help":
      require("./assets/commands/help")(BOT, interaction);
      break;

    case "add-ping":
      if (interaction.user.id !== "866741480474411028")
        require("./assets/commands/addPing")(BOT, interaction);
      break;

    case "remove-ping":
      require("./assets/commands/removePing")(BOT, interaction);
      break;

    case "reset-ping":
      require("./assets/commands/resetPing")(BOT, interaction);
      break;

    case "calendrier-ping":
      require("./assets/commands/calendrier-ping")(BOT, interaction);
      break;

    default:
      break;
  }
});

BOT.login(process.env.BOT_TOKEN);
