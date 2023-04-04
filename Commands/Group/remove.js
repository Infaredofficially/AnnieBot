require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "remove",
  alias: ["rem"],
  desc: "Remove a member from group",
  category: "Group",
  usage: "remove @user",
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag,pushName}
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`Bot and *${pushName}* both must be admin in order to use this command !`);
    if (!text && !m.quoted) return m.reply(`Please tag a user to *Remove* from group!`)

    if (!text && !m.quoted) {
      return Miku.sendMessage(
        m.from,
        { text: `Please tag a user to *Remove* !` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let users = (await mentionedUser) || m.msg.contextInfo.participant;

    try {
      await Miku.groupParticipantsUpdate(m.from, [users], "remove").then(
        (res) =>
          Miku.sendMessage(
            m.from,
            { text: `@${mentionedUser.split("@")[0]} has been *Removed* Successfully by *${pushName}*` },
            { quoted: m }
          )
      );
    } catch (err) {
      Miku.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
