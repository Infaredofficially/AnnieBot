const fs = require("fs");
require("../../Database/dataschema.js");
const config = require("../../config");
const eco = require("discord-mongoose-economy");
const ty = eco.connect(config.mongodb);

module.exports = {
  name: "wallet",
  desc: "Shows Wallet.",
  alias: ["wallet"],
  category: "Economy",
  react: "💲",
  start: async (
    Miku,
    m,
    { text, prefix }
  ) => {
    let user = m.sender;
    const cara = "cara";
    const balance = await eco.balance(user, cara);

    await Miku.sendMessage(
      m.from,
      {
        image: fs.readFileSync("./Assets/Img/card.png"),
        caption: `\n💳 *${m.pushName}'s Wallet:*\n\n_💴 ${balance.wallet}_`,
      },
      { quoted: m }
    );
  },
};
