const axios = require("axios");

module.exports = {
  name: "whitehair",
  alias: ["nsfwwhitehair"],
  desc: "Hentai picture of waifu with whitehair", 
  category: "Nsfw",
  usage: `whitehair`,
  react: "🍁",
  start: async (Miku, m, { prefix,NSFWstatus }) => {

    if (NSFWstatus == "false") return m.reply(`This group is not NSFW enabled!\n\nTo configure NSFW mode, type:\n\n*${prefix}nsfw*`);
    m.reply(mess.waiting)
    let buff= await axios.get(`https://fantox-apis.vercel.app/whitehair`)
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
