const gis = require("g-i-s");

module.exports = {
  name: "gimage",
  alias: ["imagesearch", "googleimage", "googleimagesearch", "gig", "gis","image"],
  desc: "To get google image search result",
  category: "Search",
  usage: `gig <search term>`,
  react: "🍁",
  start: async (Miku, m, { text, prefix, args }) => {
    if (!args[0])
      return Miku.sendMessage(
        m.from,
        { text: `Please provide a Search Term !` },
        { quoted: m }
      );
    var ImagesearchTerm = args.join(" ");

    gis(args.join(" "), async (error, result) => {
      n = result;
      images = n[Math.floor(Math.random() * n.length)].url;

      let resText = `\n_🎀 Image Search Term:_ *${ImagesearchTerm}*\n\n_🧩 Powered by_ *${botName}*\n`;

      /*
      let buttons = [
        {
          buttonId: `${prefix}gimage ${ImagesearchTerm}`,
          buttonText: { displayText: ">>" },
          type: 1,
        },
      ];*/
      await Miku.sendMessage(
        m.from,
        {
          image: {
            url: images,
          },
          caption: resText,
          //footer: `*${botName}*`,
          //buttons: buttons,
          //headerType: 4,
        },
        { quoted: m }
      );
    });
  },
};
