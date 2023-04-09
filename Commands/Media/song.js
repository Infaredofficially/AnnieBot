const YT = require("../../lib/ytdl-core.js");
const fs = require("fs");
const yts = require("youtube-yts");
const fetch = require("node-fetch");
const { getBuffer } = require("../../lib/myfunc");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = {
  name: "play",
  alias: ["yt"],
  desc: "To download a song as mp3 from YouTube link",
  cool: 30,
  category: "Media",
  usage: `ytad <song link>`,
  react: "🍁",
  start: async (Miku, m, { text, prefix, args, mime }) => {
    if (!args[0])
      return Miku.sendMessage(
        m.from,
        { text: `Please provide a YouTube Video link !` },
        { quoted: m }
      );
      const songSerachTerm = args.join(" ");
    const songInfo = await yts(songSerachTerm);
    const song = songInfo.videos[0];
    let videoUrl = song.url;
    let videoId = videoUrl.split("v=")[1];

    yts({ videoId }).then((result) => {
      YT.mp3(videoId).then((file) => {
        const inputPath = file.path;
        const outputPath = inputPath + ".opus";

        ffmpeg(inputPath)
          .format("opus")
          .on("error", (err) => {
            console.error("Error converting to opus:", err);
          })
          .on("end", async () => {
            const thumbnailBuffer = await getBuffer(song.thumbnail);
            
            Miku.sendMessage(
              m.from,
              {
                audio: fs.readFileSync(outputPath),
                mimetype: "audio/ogg; codecs=opus",
                ptt: true,
                contextInfo: {
                  externalAdReply: {
                    title: song.title.substr(0, 30),
                    body: song.description.substr(0, 30),
                    mediaType: 2,
                    thumbnail: thumbnailBuffer,
                    mediaUrl: song.url
                  }
                }
              },
              { quoted: m }
            );
            
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
          })
          
          
          .save(outputPath);
      });
    });
  },
};
