//අනිවාරියෙන්ම මේ අලු පාට TEXT ටික කියවන්න EDIT කරන්න කලින්😗...
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "gowzXJ4Q#ybwE2vwtXu5u7TiVYyz0lJpn1sc3txKrhFkfjtPykB0",//session id එක llw session generator site එකෙන් ගන්න...
MONGODB: process.env.MONGODB || "mongodb://mongo:dywlriqTdJtyYVJGPFAswfakPPBGvwbl@yamanote.proxy.rlwy.net:34571",//මේක railway site එකෙන් mongodb database එකක් හදන් ඒකෙ pubic url එක දාන්න.yt එකෙත් video එකක් දාන්නම් ඒත් තෙරෙන්නෙ නැත්තම් මට whatsapp msg එකක් දාන්න 94705564619....

};
