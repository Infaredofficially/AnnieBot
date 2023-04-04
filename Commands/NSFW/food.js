const axios = require("axios");

module.exports = {
  name: "food",
  alias: ["nsfwfood"],
  desc: "Hentai picture of waifu with/as food", 
  category: "Nsfw",
  usage: `food`,
  react: "🍁",
  start: async (Miku, m, { prefix,NSFWstatus }) => {

    if (NSFWstatus == "false") return m.reply(`This group is not NSFW enabled!\n\nTo configure NSFW mode, type:\n\n*${prefix}nsfw*`);
    m.reply(mess.waiting)
    let buff= await axios.get(`https://fantox-apis.vercel.app/food`)
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
