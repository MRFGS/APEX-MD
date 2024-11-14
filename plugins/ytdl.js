const { cmd, commands } = require('../command');
const play = require('play-dl');

cmd({
    pattern: "song",
    desc: "Download YouTube Audios & Videos",
    category: "download",
    filename: __filename
},

async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or Name ❗");

        // Search for the video
        const searchResults = await play.search(q, { limit: 1 });
        const video = searchResults[0];
        const videoUrl = video.url;

        let desc = `
*❍🌟 APEX-MD SONG DOWNLOADER 🌟❍*

*Title:* ${video.title}
*Description:* ${video.description}
*Duration:* ${video.durationRaw}
*Views:* ${video.views}
*Published:* ${video.uploadedAt}

> *Powered by Team MRFG ❍ (SxL)*
        `;

        // Send video information with thumbnail
        await conn.sendMessage(from, { image: { url: video.thumbnails[0].url }, caption: desc }, { quoted: mek });

        // Download audio
        const audioStream = await play.stream(videoUrl);
        await conn.sendMessage(from, { audio: { stream: audioStream.stream }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
