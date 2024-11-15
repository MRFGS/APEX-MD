const { cmd, commands } = require('../command');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "Download YouTube Audios",
    category: "download",
    filename: __filename
},

async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or Name ❗");

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
*❍🌟 APEX-MD SONG DOWNLOADER 🌟❍*

*Title:* ${data.title}
*Description:* ${data.description}
*Duration:* ${data.timestamp}
*Views:* ${data.views}
*Published:* ${data.ago}

> *Powered by Team MRFG ❍ (SxL)*
        `;

        // Send video information with thumbnail
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio using ytdl-core
        const stream = ytdl(url, { filter: 'audioonly' });

        // Send audio
        await conn.sendMessage(from, { audio: stream, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
