const { cmd, commands } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');

cmd({
  pattern: "video",
  desc: "Download videos.",
  category: "download",
  react: '🎥',
  filename: __filename
}, async (messageHandler, context, quotedMessage, { from, reply, q }) => {
  try {
    if (!q) return reply("*Please Provide A video title or Url 🙂*");

    const searchResults = await yts(q);
    if (!searchResults || searchResults.videos.length === 0) {
      return reply("*No video Found...🙄*");
    }

    const videoData = searchResults.videos[0];
    const videoUrl = videoData.url;

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
        try {
          const videoStream = ytdl(videoUrl, { quality: 'highestvideo' });
          videoStream.on('error', (err) => {
            console.error("ytdl-core error:", err);
            reply("*Error downloading video... 🚫*");
          });

          switch (userReply) {
            case '1': // Video File
              await messageHandler.sendMessage(
                from,
                {
                  video: videoStream,
                  mimetype: 'video/mp4',
                },
                { quoted: quotedMessage }
              );
              break;
            case '2': // Document File
              await messageHandler.sendMessage(
                from,
                {
                  document: videoStream,
                  mimetype: 'video/mp4',
                  fileName: `${videoData.title}.mp4`,
                  caption: `${videoData.title}\n\n*LLW MD VIDEO DOWNLOADED* ✅`,
                },
                { quoted: quotedMessage }
              );
              break;
            default:
              reply("*OPTION NOT FOUND... 🚫*");
              break;
          }
        } catch (error) {
          console.error("Error processing video:", error);
          reply("*Error processing video URL... 🚫*");
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply("*ERROR OCCURED ON LLW MD...🚫*");
  }
});
