const axios = require("axios");

module.exports = {
  name: "drunk",
  alias: ["nsfwdrunk"],
  desc: "Hentai picture of drunk waifu", 
  category: "Nsfw",
  usage: `drunk`,
  react: "🍁",
  start: async (Miku, m, { prefix,NSFWstatus }) => {

    if (NSFWstatus == "false") return m.reply(`This group is not NSFW enabled!\n\nTo configure NSFW mode, type:\n\n*${prefix}nsfw*`);
    m.reply(mess.waiting)
    let buff= await axios.get(`https://fantox-apis.vercel.app/drunk`)
    let imgURL = buff.data.url
    
    let bmffg = {
      image: {url: imgURL},
      caption: `\n*🎀 FantoX APIs 🎀*\n\n*🧩 API link:* \nhttps://fantox-api.vercel.app\n`,
    };
    
    await Miku.sendMessage(m.from, bmffg, { quoted: m }).catch((err) => {
      return "Error!";
    });
  },
};
