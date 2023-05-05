const axios = require("axios");

module.exports = {
  name: "dare",
  alias: ["givedare", "d"],
  desc: "give a dare",
  cool: 3,
  react: "🙄",
  category: "Fun",
  start: async (Miku, m, { text, prefix }) => {
    const shibam = await axios.get(
      "https://smiling-hosiery-bear.cyclic.app/weeb/dare"
    );
    
    await Miku.sendMessage(m.from, {image: { url: botImage4 },caption: `*${shibam.data}*`,}, { quoted: m });
  },
};
