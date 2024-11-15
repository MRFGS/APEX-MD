const { cmd, commands } = require('../command');
const axios = require('axios');
const yts = require('yt-search');

// Retry logic function
async function fetchAudioDownloadUrl(url) {
    try {
        let attempts = 0;
        let maxAttempts = 5; // Number of retry attempts
        let downloadUrl = null;
        
        while (attempts < maxAttempts && !downloadUrl) {
            const apiUrl = `https://api-pink-venom.vercel.app/api/ytmp3?url=${encodeURIComponent(url)}`;
            const response = await axios.get(apiUrl);
            
            if (response.data && response.data.link) {
                downloadUrl = response.data.link;
            } else {
                attempts++;
                console.log(`Attempt ${attempts} failed. Retrying...`);
                await sleep(2000); // Sleep for 2 seconds before retrying
            }
        }

        if (!downloadUrl) {
            throw new Error("Failed to fetch audio download link after multiple attempts.");
        }

        return downloadUrl;
    } catch (error) {
        throw error;
    }
}

// Utility function to pause between retries
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

        // Fetch the audio download URL using retry logic
        const downloadUrl = await fetchAudioDownloadUrl(url);

        // Send the audio file
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message || e}`);
    }
});
