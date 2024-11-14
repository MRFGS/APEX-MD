const { cmd, commands } = require('../command');
const axios = require('axios');
const ytdl = require('@distube/youtube-dl');

cmd({
    pattern: "song",
    desc: "Download YouTube Audios & Videos",
    category: "download",
    filename: __filename
},

async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a URL or Name ❗");

        // YouTube video search using axios and URL construction
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
        const { data } = await axios.get(searchUrl);
        const videoId = data.split('watch?v=')[1].split('"')[0];
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        // Fetching video information
        const videoInfo = await ytdl.getInfo(videoUrl);
        const videoDetails = videoInfo.videoDetails;

        let desc = `
*❍🌟 APEX-MD SONG DOWNLOADER 🌟❍*

*Title:* ${videoDetails.title}
*Description:* ${videoDetails.shortDescription}
*Duration:* ${videoDetails.lengthSeconds} seconds
*Views:* ${videoDetails.viewCount}
*Published:* ${videoDetails.publishDate}

> *Powered by Team MRFG ❍ (SxL)*
        `;

        // Send video information with thumbnail
        await conn.sendMessage(from, { image: { url: videoDetails.thumbnails[0].url }, caption: desc }, { quoted: mek });

        // Download and send audio
        const audioStream = await ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' });
        await conn.sendMessage(from, { audio: { stream: audioStream }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
