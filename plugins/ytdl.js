const { cmd, commands } = require('../command');
const fetch = require('node-fetch'); // Use node-fetch for making HTTP requests
const yts = require('yt-search'); // yt-search for YouTube search functionality
const fg = require('api-dylux'); // api-dylux for YouTube audio and video downloads

cmd({
    pattern: "song",
    desc: "Download YouTube Audios",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        // Ensure user provides a query
        if (!q) {
            return reply("❗ Please provide a YouTube URL or song name.");
        }

        // Search for videos on YouTube using yt-search
        const search = await yts(q);
        if (!search || !search.videos || search.videos.length === 0) {
            return reply("❗ Could not find any results for your query.");
        }

        // Get the first video from the search results
        const data = search.videos[0];
        const url = data.url;

        // Prepare description for the video
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

        // Attempt to download the audio
        try {
            // Use api-dylux's yta method to download the audio
            const audioData = await fg.yta(url);
            if (!audioData || !audioData.dl_url) {
                return reply("❗ Failed to retrieve the audio download link. Please try again later.");
            }

            // Get the download URL
            const downloadUrl = audioData.dl_url;

            // Send the audio to the user
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
            reply("✅ Audio downloaded and sent successfully!");

        } catch (downloadError) {
            // Handle any errors that occur during the download process
            console.error("Download error:", downloadError);
            reply("❗ Error occurred while downloading the audio. Please try again later.");
        }

    } catch (error) {
        // Handle any unexpected errors
        console.error("General error:", error);
        reply("❗ An unexpected error occurred. Please check the query or try again later.");
    }
});
