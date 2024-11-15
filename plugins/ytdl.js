import { cmd, commands } from '../command';
import fg from 'api-dylux';
import yts from 'yt-search';

// Define an async function to handle the dynamic import
async function getFetch() {
  const { default: fetch } = await import('node-fetch');
  return fetch;
}

cmd({
  pattern: "song",
  desc: "Download YouTube Audios",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
  try {
    if (!q) return reply("❗ Please provide a YouTube URL or song name.");

    // Search YouTube
    const search = await yts(q);
    if (!search || !search.videos || search.videos.length === 0) {
      return reply("❗ Could not find any results for your query.");
    }

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

    // Now use the getFetch function to dynamically import fetch
    const fetch = await getFetch();

    // Download audio
    try {
      let down = await fg.yta(url);
      if (!down || !down.dl_url) {
        return reply("❗ Failed to get the download link. Please try again later.");
      }

      let downloadUrl = down.dl_url;

      // Send audio
      await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
      reply("✅ Audio downloaded and sent successfully!");
    } catch (downloadError) {
      console.error("Download error:", downloadError);
      reply("❗ Error occurred while downloading the audio. Please try again later.");
    }

  } catch (e) {
    console.error("General error:", e);
    reply("❗ An unexpected error occurred. Please check the query or try again later.");
  }
});
