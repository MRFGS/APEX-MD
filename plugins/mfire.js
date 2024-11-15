const { cmd } = require('../command');
const miniget = require('miniget');
const fs = require('fs');
const path = require('path');

// Function to validate URL
function validateUrl(url) {
    const mediafireRegex = /^(https?:\/\/)?(www\.)?mediafire\.com\/(file|download)\//;
    return mediafireRegex.test(url);
}

// Function to handle the file download from MediaFire
async function downloadFile(url, destination) {
    try {
        // Creating a write stream to save the file
        const fileStream = fs.createWriteStream(destination);
        
        // Starting the download
        const downloadStream = miniget(url);
        
        // Pipe the download stream to the file stream
        downloadStream.pipe(fileStream);

        return new Promise((resolve, reject) => {
            // Listen to 'finish' event to confirm download completion
            fileStream.on('finish', () => {
                console.log('Download completed.');
                resolve(destination);
            });

            // Listen to 'error' event to handle download errors
            downloadStream.on('error', (err) => {
                console.error(`Error downloading file: ${err.message}`);
                reject(err);
            });

            fileStream.on('error', (err) => {
                console.error(`Error saving file: ${err.message}`);
                reject(err);
            });
        });
    } catch (err) {
        console.error(`Download error: ${err.message}`);
        throw err;
    }
}

// Function to send file after downloading
async function sendDownloadedFile(conn, from, filePath) {
    try {
        const fileName = path.basename(filePath);
        await conn.sendMessage(from, { document: { url: filePath }, mimetype: 'application/octet-stream', fileName: fileName });
    } catch (err) {
        console.error(`Error sending file: ${err.message}`);
        throw err;
    }
}

// Main command to handle the downloader
cmd({
    pattern: "mediafire",
    desc: "Download MediaFire Files",
    category: "download",
    filename: __filename
},

async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Step 1: Validate if the URL is provided and is a valid MediaFire URL
        if (!q || !validateUrl(q)) {
            return reply("කරුණාකර MediaFire URL එකක් ලබා දෙන්න.");
        }

        // Step 2: Prepare the file download
        const fileUrl = q.trim();
        const tempFilePath = path.join(__dirname, `downloads`, `${Date.now()}.download`); // Create a temporary file path

        // Step 3: Download the file
        reply("ගොනුව බාගත කරමින් පවතී...");
        await downloadFile(fileUrl, tempFilePath);

        // Step 4: Send the downloaded file
        await sendDownloadedFile(conn, from, tempFilePath);

        // Step 5: Cleanup - Delete the temporary file after sending
        fs.unlinkSync(tempFilePath);

    } catch (e) {
        console.error(`Error: ${e.message}`);
        reply(`ගොනුව බාගත කිරීමට දෝෂයක් ඇතිවිය: ${e.message}`);
    }
});
