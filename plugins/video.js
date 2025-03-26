const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')


//=================video download============
cmd({
    pattern: "video",
    desc: "download videos",
    react: '🎥',
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("please provide the title of the video... *llw md 2025*")
const search = await yts(q)
const data = search.videos[0];
const url = data.url

let desc = `
 ⚡ *LLW MD V1 VIDEO DOWNLOADER* ⚡

 💠 *title:* ${data.title}
 
 💠 *description:* ${data.description}
 
 💠 *time:* ${data.timestamp}
 
 💠 *ago:* ${data.ago}
 
 💠 *views:* ${data.views}
 
 💠 *url:* ${data.url}

 *MADE BY LLW EDITZ*🗿
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video
    
let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video+document message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*LLW VIDEO DOWNLOADED*"},{quoted:mek})





}catch(e){
console.log(e)
reply(`${e}`)
}
})
