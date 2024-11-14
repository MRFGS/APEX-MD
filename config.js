const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "NUQxmKQT#McRRpRwZ-H3EJ8qgahQLG7c8jwvy8SSqyI59LnZCnZs",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/MRFGS/Apex-md-images-/refs/heads/main/42a74b5d-8ea7-454f-9b55-ad728442d4a3.jpeg?token=GHSAT0AAAAAAC2KMSGV5DYGYHMCDGVGR4WGZZVYDKQ",
ALIVE_MSG: process.envALIVE_MSG || "*❍ APEX-MD ONLINE NOW ❍*",
};
