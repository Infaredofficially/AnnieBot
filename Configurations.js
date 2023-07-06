require("dotenv").config();

let gg = process.env.MODS;
if (!gg) {
  gg = "2349163861236";   // You can replace this number with yours //
}


global.owner = gg.split(",");
global.mongodb = process.env.MONGODB || "mongodb+srv://Tommydlonewolf:<Tommydav>@cluster0.yeswmep.mongodb.net/";
global.sessionId = process.env.SESSION_ID || "ok";
global.prefa = process.env.PREFIX || ".";
global.tenorApiKey = process.env.TENOR_API_KEY || "AIzaSyCnDRdx0ze9RF_mKbHmre7ZiPJT2Vk8JoA";
global.packname = process.env.PACKNAME || `Annie Bot`;
global.author = process.env.AUTHOR || "by: Tomi Atlas Edit";
global.port = process.env.PORT || "10000";
global.openAiAPI = process.env.OPENAI_API || "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";
global.owner = gg.split(",");

module.exports = {
  mongodb: global.mongodb,
};
