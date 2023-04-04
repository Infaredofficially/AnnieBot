const fs = require("fs");
require("../../Database/dataschema.js");
const config = require("../../config");
const eco = require("discord-mongoose-economy");
const ty = eco.connect(config.mongodb);

module.exports = {
  name: "daily",
  desc: "daily gold.",
  alias: ["daily"],
  category: "Economy",
  react: "💷",
  start: async (Miku, m, { text, prefix }) => {
    if (!m.isGroup)
      return Miku.sendMessage(
        m.from,
        { text: "*Group command " },
        { quoted: m }
      );
    let user = m.sender;
    const cara = "cara";
    const daily = await eco.daily(user, cara, 500);
    if (daily.cd) {
      await Miku.sendMessage(
        m.from,
        {
          image: fs.readFileSync("./Assets/Img/card.png"),
          caption: `\n🧧 You already claimed your daily revenue today, Come back in ${daily.cdL} to claim again 🫡`,
        },
        { quoted: m }
      );
    } else {
      return Miku.sendMessage(
        m.from,
        {
          text: `You have successfully claimed your daily revenue ${daily.amount} 💴 today 🎉.`,
        },
        { quoted: m }
      );
    }
  },
};
