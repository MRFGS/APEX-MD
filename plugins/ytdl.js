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

        if (!data) return reply("No video found for the given query.");

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

        // Attempt to get audio stream using ytdl-core
        const stream = ytdl(url, { filter: 'audioonly' });

        // Check if the stream is valid
        if (!stream) {
            return reply("Could not retrieve the audio. Please try again later.");
        }

        // Send audio
        await conn.sendMessage(from, { audio: stream, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        
        // Handle specific errors
        if (e instanceof MinigetError && e.statusCode === 410) {
            return reply("The video is no longer available for download (410 error).");
        }

        reply(`An error occurred: ${e.message}`);
    }
});
