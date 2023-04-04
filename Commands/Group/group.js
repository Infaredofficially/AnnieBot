module.exports = {
  name: "group",
  alias: ["gc"],
  desc: "Open / Close Group",
  category: "Group",
  usage: `group open/close`,
  react: "🍁",
  start: async (
    Miku,
    m,
    {
      text,
      prefix,
      isBotAdmin,
      isAdmin,
      args,
      pushName,
    }
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`Bot and *${pushName}* both must be admin in order to use this command !`);
    
    if (args[0] === "close") {
      await Miku.groupSettingUpdate(m.from, "announcement").then((res) =>
        m.reply(`Group has been closed!`)
      );
    } else if (args[0] === "open") {
      await Miku.groupSettingUpdate(m.from, "not_announcement").then((res) =>
        m.reply(`Group has been opened!`)
      );
    } else {
      
      await Miku.sendMessage(m.from, {image: { url: botImage2}, caption: `\n*「 Group Message Settings 」*\n\nSelect an option below.\n\n*_Usage:_*\n\n*${prefix}group open*\n*${prefix}group close*\n`,}, { quoted: m });
    }
  },
};
