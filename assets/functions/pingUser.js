const database = require("../functions/database");

module.exports = (BOT, idChannel) => {
  console.log("Recherche des pings du jour...");

  const channel = BOT.channels.cache.get(idChannel);
  const pingList = database.getData();
  const day = new Date().getDay();
  console.log("Jour : " + day);
  const dayName = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ][day];
  const dayPingList = pingList[dayName];

  if (dayPingList) {
    const pingListString = dayPingList.map((u) => u.username).join(", ");
    channel.send(`Ping du jour : ${pingListString}`);
  } else {
    channel.send(`Aucun ping aujourd'hui`);
  }
};
