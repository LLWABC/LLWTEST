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
        const start = new Date().getTime(); // Record time when the command is received and processing begins
        const end = new Date().getTime();   // Record time right before sending the reply
        const speed = Math.round(end - start);

        let status = ` *PONG*🏓...

*LLW MD Speed:* ${speed} ms


> *LLW MD V1 BY LLW* 💫
`;
        return reply(`${status}`);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
