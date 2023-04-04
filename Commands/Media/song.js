const yts = require("youtube-yts");

module.exports = {
  name: "play",
  alias: ["ytplay", "song"],
  desc: "To play a song from youtube",
  category: "Media",
  usage: `play <song name>`,
  react: "🍁",
  start: async (Miku, m, { text, prefix, args }) => {
    if (!args[0])
      return Miku.sendMessage(
        m.from,
        { text: `Please provide a song name to play !` },
        { quoted: m }
      );
    const songSearchTerm = args.join(" ");
    const songInfo = await yts(songSearchTerm);
    const song = songInfo.videos[0];

    let instructions = `
To play audio: ${prefix}ytad ${song.url}

To play video: ${prefix}ytvd ${song.url}

To send as document: ${prefix}ytdoc ${song.url}
`;

    let buttonMessage = {
      image: { url: song.thumbnail },
      caption: `
           *『 Youtube Audio Player 』*


*Song name :* _${song.title}_

*Duration :* _${song.timestamp}_

*Uploaded :* _${song.ago}_

*Channel :* _${song.author.name}_

*Url :* _${song.url}_\n\n${instructions}`,
      footer: `*${botName}*`,
      headerType: 4,
    };
    Miku.sendMessage(m.from, buttonMessage, { quoted: m });
  },
};
