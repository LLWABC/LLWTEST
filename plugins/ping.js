const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        const start = new Date().getTime(); // Record time when command processing starts
        await delay(100); // Introduce a 100ms delay
        const end = new Date().getTime();   // Record time after the delay
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
