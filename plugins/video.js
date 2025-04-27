const { cmd, commands } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs'); // You might need this depending on how your message handler works

cmd({
    pattern: "video",
    desc: "Download videos using ytdl-core with format selection.",
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

        let videoDetailsMessage = `〽️ *LLW MD V1 VIDEO DOWNLOADER (via ytdl-core)* 〽️\n\n`;
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
                    const videoMimeType = 'video/mp4';
                    const fileName = `${videoData.title}.mp4`;

                    switch (userReply) {
                        case '1': // Video File
                            await messageHandler.sendMessage(from, {
                                video: videoStream, // Send the readable stream
                                mimetype: videoMimeType
                            }, { quoted: quotedMessage });
                            break;
                        case '2': // Document File
                            await messageHandler.sendMessage(from, {
                                document: videoStream, // Send the readable stream as a document
                                mimetype: videoMimeType,
                                fileName: fileName,
                                caption: `${videoData.title}\n\n*LLW MD VIDEO DOWNLOADED* ✅`
                            }, { quoted: quotedMessage });
                            break;
                        default:
                            reply("*OPTION NOT FOUND... 🚫*");
                            break;
                    }

                    videoStream.on('error', (err) => {
                        console.error("ytdl-core stream error:", err);
                        reply(`*Error downloading video: ${err.message} 🚫*`);
                    });

                } catch (error) {
                    console.error("ytdl-core error:", error);
                    reply(`*Error processing video URL: ${error.message} 🚫*`);
                }
            }
        });

    } catch (error) {
        console.error(error);
        reply(`*ERROR OCCURED ON LLW MD...🚫*`);
    }
});
