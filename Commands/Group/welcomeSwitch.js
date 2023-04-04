const { mk } = require("../../Database/dataschema.js");

module.exports = {
  name: "welcome",
  alias: ["welcomemess", "welcomeswitch"],
  desc: "Enable or disable Welcome/Goodbye messages in a group",
  category: "Group",
  usage: "welcome [on/off]",
  react: "🎀",
  start: async (
    Miku,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName }
  ) => {
    if (!isAdmin)
      return m.reply(mess.useradmin)

    let checkdata = await mk.findOne({ id: m.from });
    var groupe = await Miku.groupMetadata(m.from);
    var members = groupe["participants"];
    var mems = [];
    members.map(async (adm) => {
      mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
    });

    if (args[0] === "on") {
      if (!checkdata) {
        await new mk({ id: m.from, switchWelcome: "true" }).save();
        Miku.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Miku.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group!`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "true")
          return Miku.sendMessage(
            m.from,
            {
              text: `*Welcome/Goodbye* messages is already *Activated* in this group!`,
            },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { switchWelcome: "true" });
        return Miku.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *Activated* in this group!`,
          },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new mk({ id: m.from, switchWelcome: "false" }).save();
        return Miku.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *De-Activated* in this group!`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "false")
          return Miku.sendMessage(
            m.from,
            { text: `*Welcome/Goodbye* is not *Activated* in this group!` },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { switchWelcome: "false" });
        return Miku.sendMessage(
          m.from,
          {
            text: `*Welcome/Goodbye* messages has been *De-Activated* in this group!`,
          },
          { quoted: m }
        );
      }
    } else {
      
      await Miku.sendMessage(m.from, {image: { url: botImage2 },caption: `\n*「 Welcome Configuration 」*\n\nNote: *Welcome/Goodbye* messages will be sent when someone joins or leaves the group.\n\n*_Usage:_* \n\n${prefix}welcome on\n${prefix}welcome off\n\n*Current Status:* ${checkdata.switchWelcome == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};
