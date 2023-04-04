const { mkchar } = require("../../Database/dataschema.js");

module.exports = {
  name: "chatbotpm",
  alias: ["pmautochat", "autoreplypm", "chatbotgroup", "pmchatbot"],
  desc: "Enable or disable the autoreply feature in a group",
  category: "Mods",
  usage: "pmchatbot [on/off]",
  react: "🎀",
  start: async (
    Miku,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName, modStatus }
  ) => {
    if (modStatus == "false" && !isCreator)
      return m.reply("Sorry, only my *Devs* and *Mods* can use this command !");

    let checkdata = await mkchar.findOne({ id: "1" });

    if (args[0] === "on") {
      if (!checkdata) {
        await new mkchar({ id: "1", PMchatBot: "true" }).save();
        Miku.sendMessage(
          m.from,
          {
            text: `*PM Chatbot Activated! *\n\nBot will reply to all personal messages.`,
          },
          { quoted: m }
        );
        return Miku.sendMessage(
          m.from,
          {
            text: `*PM Chatbot Activated !*\n\nBot will reply to all personal messages.`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.PMchatBot == "true")
          return Miku.sendMessage(
            m.from,
            {
              text: `*Already activated.*\n\nBot will reply to all personal messages.`,
            },
            { quoted: m }
          );
        await mkchar.updateOne({ id: "1" }, { PMchatBot: "true" });
        return Miku.sendMessage(
          m.from,
          { text: `*PM Chatbot Activated !*` },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new mkchar({ id: "1", PMchatBot: "false" }).save();
        return Miku.sendMessage(
          m.from,
          { text: `*PM Group Chatbot De-Activated!*` },
          { quoted: m }
        );
      } else {
        if (checkdata.PMchatBot == "false")
          return Miku.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
        await mkchar.updateOne({ id: "1" }, { PMchatBot: "false" });
        return Miku.sendMessage(
          m.from,
          { text: `*PM Chatbot De-Activated !*` },
          { quoted: m }
        );
      }
    } else {
      let bmffg = {
        image: { url: botImage6 },
        caption: `\n *「  PM Chatbot configuration  」*\n\n\nNote: This will enable chatbot in bot's PM. Bot will reply to all message in PM.\n\n*_Usage:_*\n\n*${prefix}pmchatbot on*\n*${prefix}pmchatbot off*\n\n*Current Status:* ${checkdata.PMchatBot == "true" ? "On" : "Off"}`,

      };
      await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
