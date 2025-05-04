const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    desc: "get cmd list",
    react: '📂',
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
main: '',
download: '',
ai:'',
owner: '',
fun:'',
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
 }
}

let madeMenu = `⚡ *ආ ${pushname} පැටියෝ..කොහොමද..* ✌️❤️

🌐 *DETAILS* 🌐

📂 *PREFIX:* ${config.PREFIX}

📩 *BOT USER:* ${pushname}

☣️ *BOT NAME:* LLW MD

🎲 *LLW MD VERSION:* 1.0.0

♻️ *BOT OWNER:* LLW EDITZ

👑️ *OWNER NUMBER:* 94705564619

📌️ *LLW BOT REPO:* https://github.com/LLWDEV/LLWMD

🌐 *LLW MD V1 BOT MENU* 🌐

♻️ *REPLY THE COMMANDS WITH THE PREFIX* ♻️
♻️ *prefix එක සමග පහත command එක reply කරන්න* ♻️

⚡ *COMMANDS* ⚡

 🎲 *LLW DOWNLOAD MENU* 🎲
 
 ${menu.download}

 🎭 *MAIN MENU* 🎭

 ${menu.main}

🗣️ *USER MENU* 🗣️

${menu.owner}

🤖 *AI MENU* 🤖

${menu.ai}

🏓 *FUN MENU* 🏓

${menu.fun}

> *LLW MD V1*
> *DEVELOPED BY LLW EDITZ* 🗿
`
await conn.sendMessage(from,{image:{url:"https://files.catbox.moe/egqzxo.jpg"},caption:madeMenu},{quoted:mek})



}catch(e){
console.log(e)
reply(`${e}`)
}
})
