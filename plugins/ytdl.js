const { cmd, commands } = require('../command');
const axios = require('axios');
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

        // Request to the API to get the MP3 download link
        const apiUrl = `https://api-pink-venom.vercel.app/api/ytmp3?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);
        
        if (response.data && response.data.link) {
            const downloadUrl = response.data.link;

            // Send audio
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else {
            reply("Sorry, could not retrieve the audio download link.");
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
