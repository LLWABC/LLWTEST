const { cmd, commands } = require('../command');
const yts = require('yt-search');
const ytmp4 = require('ytmp4'); // Importing the denethdev-ytmp3 package for downloading

cmd({
  pattern: "video",
  desc: "Download videos.",
  category: "download",
  react: '🎥',
  filename: __filename
}, async (messageHandler, context, quotedMessage, { from, reply, q }) => {
  try {
    if (!q) return reply("*Please Provide A video title or Url 🙂*");
    
    // Search for the song using yt-search
    const searchResults = await yts(q);
    if (!searchResults || searchResults.videos.length === 0) {
      return reply("*No video Found...🙄*");
    }

    const videoData = searchResults.videos[0];
    const videoUrl = videoData.url;

    // Using denethdev-ytmp3 to fetch the download link
    let down = await ytmp4.download(videoUrl) // Download in mp3 format
    let downloadLink = down.dl_url // Get the download URL

    let videoDetailsMessage = `〽️ *LLW MD V1 VIDEO DOWNLOADER* 〽️\n\n`;
    videoDetailsMessage += `*📊 TITLE:* ${videoData.title}\n`;
    videoDetailsMessage += `*📊 VIEWS:* ${videoData.views}\n`;
    videoDetailsMessage += `*📊 TIME:* ${videoData.timestamp}\n`;
    videoDetailsMessage += `*📊 AGO:* ${videoData.ago}\n`;
    videoDetailsMessage += `*📊 CHANNEL:* ${videoData.author.name}\n`;
    videoDetailsMessage += `*📊 URL:* ${videoData.url}\n\n`;
    videoDetailsMessage += `*Choose Your Download Format:*\n\n`;
    videoDetailsMessage += `1 || VIDEO FORMAT 🎥\n`;
    videoDetailsMessage += `2 || DOCUMENT FORMAT 📂\n\n`;
    videoDetailsMessage += `> *LLW MD V1 BY LLW EDITZ*`;

    // Send the video thumbnail with song details
    const sentMessage = await messageHandler.sendMessage(from, {
      image: { url: videoData.thumbnail },
      caption: videoDetailsMessage,
    }, { quoted: quotedMessage });

    // Listen for the user's reply to select the download format
    messageHandler.ev.on("messages.upsert", async (update) => {
      const message = update.messages[0];
      if (!message.message || !message.message.extendedTextMessage) return;

      const userReply = message.message.extendedTextMessage.text.trim();

      // Handle the download format choice
      if (message.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
        switch (userReply) {
          case '1': // Audio File
            await messageHandler.sendMessage(from, {
              video: { url: downloadLink },
              mimetype: "video/mp4"
            }, { quoted: quotedMessage });
            break;
          case '2': // Document File
            await messageHandler.sendMessage(from, {
              document: { url: downloadLink },
              mimetype: 'video/mp4',
              fileName: `${videoData.title}.mp4`,
              caption: `${videoData.title}\n\n*LLW MD VIDEO DOWNLOADED* ✅`
            }, { quoted: quotedMessage });
            break;
          default:
            reply("*OPTION NOT FOUND... 🚫*");
            break;
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply("*ERROR OCCURED ON LLW MD...🚫*");
  }
});
