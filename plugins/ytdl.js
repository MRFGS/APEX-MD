const { cmd, commands } = require('../command');
const puppeteer = require('puppeteer');
const yts = require('yt-search');

async function getVideoInfo(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for video metadata to load
    await page.waitForSelector('h1.title');

    const videoInfo = await page.evaluate(() => {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]').content;
        return { title, description };
    });

    await browser.close();
    return videoInfo;
}

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

*Title:* ${video.title}
*Description:* ${video.description}
*Duration:* ${video.timestamp}
*Views:* ${video.views}
*Published:* ${video.ago}

> *Powered by Team MRFG ❍ (SxL)*
        `;

        // Send video information with thumbnail
        await conn.sendMessage(from, { image: { url: video.thumbnail }, caption: desc }, { quoted: mek });

        // Use Puppeteer to simulate a real browser and fetch the stream URL
        const streamInfo = await getVideoInfo(videoUrl);
        const audioUrl = streamInfo.audioUrl;

        // Send the audio
        await conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
