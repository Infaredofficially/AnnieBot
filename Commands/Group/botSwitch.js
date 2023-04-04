const { mk } = require("../../Database/dataschema.js");

module.exports = {
  name: "cmd",
  alias: ["bot", "botswitch"],
  desc: "Enable or disable bot in a group",
  category: "Group",
  usage: "cmd [on/off]",
  react: "🎀",
  start: async (
    Miku,
    m,
    {
      args,
      isBotAdmin,
      isAdmin,
      isCreator,
      reply,
      prefix,
      pushName,
      participants,
    }
  ) => {
    if (!isAdmin)
      return Miku.sendMessage(
        m.from,
        {
          text: `*${pushName}* must be *Admin* to turn ON/OFF bot !`,
        },
        { quoted: m }
      );

    let checkdata = await mk.findOne({ id: m.from });
    var groupe = await Miku.groupMetadata(m.from);
    var members = groupe["participants"];
    var mems = [];
    members.map(async (adm) => {
      mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
    });

    if (args[0] === "on") {
      if (!checkdata) {
        await new mk({ id: m.from, botSwitch: "true" }).save();
        Miku.sendMessage(
          m.from,
          {
            text: `*${botName}* has been Re-Activated in this group!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Miku.sendMessage(
          m.from,
          { text: `*${botName}* has been Re-Activated in this group!` },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "true")
          return Miku.sendMessage(
            m.from,
            { text: `*${botName}* is already Activated in this group !` },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { botSwitch: "true" });
        return Miku.sendMessage(
          m.from,
          { text: `*${botName}* has been Activated in this group! Now everyone here can use bot.` },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new mk({ id: m.from, botSwitch: "false" }).save();
        return Miku.sendMessage(
          m.from,
          {
            text: `*${botName}* has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "false")
          return Miku.sendMessage(
            m.from,
            { text: `*${botName}* is already De-Activated in this group !\n\nNow only *Admins* can use bot` },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { botSwitch: "false" });
        return Miku.sendMessage(
          m.from,
          {
            text: `${botName} has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      }
    } else {
    
      await Miku.sendMessage(m.from, {image: { url: botImage2 },
        caption: `\n *「  Admin Only Mode  」*\n\nNote: This feature will only make bot useable for admins only.\n\n*_Usage:_*\n\n*${prefix}bot on*\n*${prefix}bot off*\n\n*Current Status:* ${checkdata.botSwitch == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};
