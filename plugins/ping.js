const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    alias: ["status", "botinfo"],
    react: '🏓',
    desc: "check bot speed",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const start = new Date().getTime();
        const end = new Date().getTime();
        const speed = Math.round(end - start);

        let speedText;
        if (speed <= 10) {
            speedText = 'LLW MD IS LIGHTNING FAST⚡';
        } else if (speed <= 50) {
            speedText = 'LLW MD IS FAST👍';
        } else if (speed <= 100) {
            speedText = 'LLW MD IS AVERAGE SPEED🏓';
        } else if (speed <= 500) {
            speedText = 'LLW IS GETTING SLOWER😔';
        } else {
            speedText = 'GO GET ANOTHER PHONE💀';
        }

        let status = ` *PONG*🏓...

*LLW MD Speed:* ${speed} ms (${speedText})


> *LLW MD V1 BY LLW* 💫
`;
        return reply(`${status}`);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
