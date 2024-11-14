const { cmd, commands } = require('../command');
const playDL = require('play-dl');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "Download YouTube Audio",
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

        // Download the audio using play-dl
        const stream = await playDL.stream(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const audioUrl = stream.url;

        // Send the audio
        await conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});


cmd({
    pattern: "video",
    desc: "Download YouTube Video",
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
*❍🌟 APEX-MD VIDEO DOWNLOADER 🌟❍*

*Title ❍➤* ${video.title}
*Description ❍➤* ${video.description}
*Duration ❍➤* ${video.timestamp}
*Views ❍➤* ${video.views}
*Published ❍➤* ${video.ago}

> *Powered by Team MRFG ❍ (SxL)*
        `;

        // Send video information with thumbnail
        await conn.sendMessage(from, { image: { url: video.thumbnail }, caption: desc }, { quoted: mek });

        // Download the video using play-dl
        const stream = await playDL.stream(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const videoUrlStream = stream.url;

        // Send the video
        await conn.sendMessage(from, { video: { url: videoUrlStream }, mimetype: "video/mp4" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
