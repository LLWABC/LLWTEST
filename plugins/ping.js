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
        await reply('Pinging llw md...');
        const end = new Date().getTime();
        const speed = Math.round(end - start);

        let status = ` *PONG🏓....

 *Speed:* ${speed} ms


 > LLW MD V1💫

`;
        return reply(`${status}`);

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
