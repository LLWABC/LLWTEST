const { cmd, commands } = require('../command');
const yts = require('yt-search');
const fg = require('api-dylux'); // Corrected import

cmd({
  pattern: "video",
  desc: "Download videos using api-dylux with format selection.",
  category: "download",
  react: '🎥',
  filename: __filename
}, async (messageHandler, context, quotedMessage, { from, reply, q }) => {
  try {
    if (!q) return reply("*Please Provide A video title or Url 🙂*");

    let videoUrl;
    if (q.startsWith('youtube.com') || q.startsWith('youtu.be') || q.includes('youtube.com') || q.includes('youtu.be')) {
      videoUrl = q;
    } else {
      const searchResults = await yts(q);
      if (!searchResults || searchResults.videos.length === 0) {
        return reply("*No video Found...🙄*");
      }
      videoUrl = searchResults.videos[0].url;
    }

    if (!videoUrl) {
      return reply("*Could not determine video URL... 🚫*");
    }

    const result = await fg(videoUrl);

    if (!result || !result.url) {
      return reply("*Could not retrieve video download link from api-dylux... 🚫*");
    }

    const searchResultsForInfo = await yts({ url: videoUrl });
    const videoData = searchResultsForInfo.videos[0];

    let videoDetailsMessage = `〽️ *LLW MD V1 VIDEO DOWNLOADER (via dylux)* 〽️\n\n`;
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

    const sentMessage = await messageHandler.sendMessage(from, {
      image: { url: videoData.thumbnail },
      caption: videoDetailsMessage,
    }, { quoted: quotedMessage });

    messageHandler.ev.on("messages.upsert", async (update) => {
      const message = update.messages[0];
      if (!message.message?.extendedTextMessage?.text) return;

      const userReply = message.message.extendedTextMessage.text.trim();

      if (
        message.message.extendedTextMessage.contextInfo?.stanzaId === sentMessage.key.id
      ) {
        switch (userReply) {
          case '1': // Video File
            await messageHandler.sendMessage(from, {
              video: { url: result.url },
              mimetype: 'video/mp4' // Assuming api-dylux provides MP4
            }, { quoted: quotedMessage });
            break;
          case '2': // Document File
            await messageHandler.sendMessage(from, {
              document: { url: result.url },
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
    console.error("api-dylux Error:", error);
    reply(`*Error using api-dylux: ${error.message} 🚫*`);
  }
});
