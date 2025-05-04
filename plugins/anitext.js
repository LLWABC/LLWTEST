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
        let sentMessageKey = null;

        for (let i = 1; i <= text.length; i++) {
            const currentText = text.substring(0, i);
            if (i === 1) {
                const sentMessage = await conn.sendMessage(m.chat, { text: currentText });
                sentMessageKey = sentMessage.key;
                await sleep(500);
            } else {
                if (sentMessageKey) {
                    await conn.sendMessage(m.chat, {
                        text: currentText,
                        edit: sentMessageKey
                    });
                    await sleep(500);
                }
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
