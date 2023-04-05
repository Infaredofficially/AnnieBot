const YT = require("../../lib/ytdl-core.js");
const fs = require("fs");
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
    const songSerachTerm = args.join(" ");
    const songInfo = await yts(songSerachTerm);
    const song = songInfo.videos[0];
    let videoUrl = song.url;
    let videoId = videoUrl.split("v=")[1];

    await Miku.sendMessage(
      m.from,
      {
        image: { url: song.thumbnail },
        caption: `\n*Song name :* _${song.title}_

*Duration :* _${song.timestamp}_

*Url :* _${song.url}_


_*Downloading Song...*_\n\n`,
      },
      { quoted: m }
    );

    yts(videoId).then((result) => {
      const length = result.seconds;

      if (length >= 1800) {
        return m.reply(
          "Command Rejected! The audio is more than 30 minutes long! "
        );
      } else {
        const ytaud = YT.mp3(videoId).then((file) => {
          Miku.sendMessage(
            m.from,
            {
              audio: fs.readFileSync(file.path),
              mimetype: "audio/mpeg",
            },
            { quoted: m }
          );
          fs.unlinkSync(file.path);
        });
      }
    }).catch((err) => {
      console.error(err);
      Miku.sendMessage(
        m.from,
        { text: `Failed to play the song: ${err.message}` },
        { quoted: m }
      );
    });
  },
};
