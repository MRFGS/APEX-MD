const { cmd, commands } = require('../command');
const yts = require('yt-search');
const fg = require('api-dylux');

cmd({
    pattern: "song",
    desc: "Download YouTube Audios & Videos",
    category: "download",
    filename: __filename
},

async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or Name ❗");

        // Search for the video using yt-search
        const searchResults = await yts(q);
        const video = searchResults.videos[0];  // Selecting the first result
        const videoUrl = video.url;

        let desc = `
*❍🌟 APEX-MD SONG DOWNLOADER 🌟❍*

*Title ❍➤* ${video.title}
*Description ❍➤* ${video.description}
*Duration ❍➤* ${video.timestamp}
*Views ❍➤* ${video.views}
*Published ❍➤* ${video.ago}

> *Powered by Team MRFG ❍ (SxL)*
        `;

        // Send video information with thumbnail
        await conn.sendMessage(from, { image: { url: video.thumbnail }, caption: desc }, { quoted: mek });

        // Download the audio using api-dylux
        const download = await fg.yta(videoUrl);
        const downloadUrl = download.dl_url;

        // Send the audio
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
