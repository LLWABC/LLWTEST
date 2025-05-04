const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "anitext",
    desc: "Creates an animated text effect.",
    react: '✍️',
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { text, prefix, reply }) => {
    if (!text) {
        return reply(`Please provide text to animate. Example: ${prefix}anitext Hello`);
    }

    try {
        for (let i = 1; i <= text.length; i++) {
            const currentText = text.substring(0, i);
            if (i === 1) {
                // Send the first letter
                const sentMessage = await conn.sendMessage(m.chat, { text: currentText });
                // Store the message key to edit later
                m.messageStubType = undefined; // Reset stub type to allow editing
                m.messageStubParameters = undefined;
                m.key.id = sentMessage.key.id;
                m.key.fromMe = true; // Set as sent by the bot
                await sleep(500); // Adjust delay as needed
            } else {
                // Edit the previously sent message
                await conn.sendMessage(m.chat, {
                    text: currentText,
                    edit: m.key
                });
                await sleep(500); // Adjust delay as needed
            }
        }
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e}`);
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
