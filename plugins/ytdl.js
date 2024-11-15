import fetch from 'node-fetch';
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  getsize,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require("../lib/functions");
const {
  cmd,
  commands
} = require('../command');
const fg = require("api-dylux");
const yts = require("yt-search");
async function dlyta(_0x3210fb) {
  try {
    for (let _0x33b16d = 0x0; _0x33b16d < 0xa; _0x33b16d++) {
      const _0x4784e7 = await fetch("https://api-pink-venom.vercel.app/api/ytdl?url=" + _0x3210fb);
      const _0x2640e9 = await _0x4784e7.json();
      if (_0x2640e9.result.download_url) {
        return {
          'status': true,
          'dl_link': _0x2640e9.result.download_url
        };
      }
      ;
    }
    await new Promise(_0x1e9cba => setTimeout(_0x1e9cba, 0xfa0));
    return {
      'status': false,
      'msg': "error"
    };
  } catch (_0x49beae) {
    console.error(_0x49beae);
    return {
      'status': false,
      'msg': _0x49beae.message
    };
  }
}
cmd({
  'pattern': "yta",
  'alias': ["ytmp3", 'ytdown'],
  'react': '🎧',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0x8a410a, _0x588e3f, _0x1099a5, {
  from: _0x418acf,
  q: _0x48c130,
  reply: _0x3a6be1
}) => {
  try {
    if (!_0x48c130) {
      return await _0x3a6be1("*Need a YouTube URL!*");
    }
    _0x3a6be1("*DOWNLOADING···*\n> ALEXA-MD");
    const _0x5e0f7c = await dlyta(_0x48c130);
    await _0x8a410a.sendMessage(_0x418acf, {
      'audio': {
        'url': _0x5e0f7c.dl_link
      },
      'mimetype': "audio/mpeg"
    }, {
      'quoted': _0x588e3f
    });
  } catch (_0x4cc801) {
    console.log("First attempt failed:", _0x4cc801);
    try {
      const _0x43632f = await dlyta(_0x48c130);
      await _0x8a410a.sendMessage(_0x418acf, {
        'audio': {
          'url': _0x43632f.dl_link
        },
        'mimetype': "audio/mpeg"
      }, {
        'quoted': _0x588e3f
      });
    } catch (_0x402e63) {
      console.log("Second attempt failed:", _0x402e63);
      await _0x3a6be1("*Failed to process the request. Please try again later!*");
    }
  }
});
cmd({
  'pattern': 'song',
  'alias': ["play", 'yts'],
  'react': '🎵',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0x33e7cf, _0x29345f, _0x302243, {
  from: _0x50d8d0,
  q: _0x41efe9,
  reply: _0x19a939
}) => {
  try {
    if (!_0x41efe9) {
      return await _0x19a939("*Need a Title!*");
    }
    const _0x15baab = await yts(_0x41efe9);
    const _0x246f2c = _0x15baab.videos[0x0];
    const _0x37ed0d = _0x246f2c.url;
    let _0x2b9c99 = `
    ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▱
    *❍🌟 APEX-MD SONG DOWNLOADER 🌟❍*
    ⁠⁠⁠⁠▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▱
    
    ❍ *Title ➤* " + _0x246f2c.title + "
    ❍ *Description ➤* " + _0x246f2c.description + "
    ❍ *Duration ➤* " + _0x246f2c.timestamp + "
    ❍ *Ago ➤* " + _0x246f2c.ago + "
    ❍ *Views ➤* " + _0x246f2c.views + "
    ❍ *URL ➤* " + _0x246f2c.url + "
    
    > *Powered by Team MRFG ❍ (SxL)* `;
      
    let _0x345c19 = await _0x33e7cf.sendMessage(_0x50d8d0, {
      'image': {
        'url': _0x246f2c.thumbnail
      },
      'caption': _0x2b9c99
    }, {
      'quoted': _0x29345f
    });
    const _0x1b375e = await dlyta(_0x37ed0d);
    await _0x33e7cf.sendMessage(_0x50d8d0, {
      'audio': {
        'url': _0x1b375e.dl_link
      },
      'mimetype': "audio/mpeg"
    }, {
      'quoted': _0x29345f
    });
    await _0x33e7cf.sendMessage(_0x50d8d0, {
      'delete': _0x345c19.key
    });
  } catch (_0x48d3f1) {
    console.log("First attempt failed:", _0x48d3f1);
    try {
      const _0x44193a = await dlyta(url);
      await _0x33e7cf.sendMessage(_0x50d8d0, {
        'audio': {
          'url': _0x44193a.dl_link
        },
        'mimetype': "audio/mpeg"
      }, {
        'quoted': _0x29345f
      });
      await _0x33e7cf.sendMessage(_0x50d8d0, {
        'delete': dels.key
      });
    } catch (_0x3c3044) {
      console.log("Second attempt failed:", _0x3c3044);
      await _0x19a939("*Failed to process the request. Please try again later!*");
    }
  }
});
cmd({
  'pattern': "video",
  'desc': "downlode videos",
  'category': "downlode",
  'react': '🌟',
  'filename': __filename
}, async (_0x55d0ac, _0x5a89fd, _0x1d185d, {
  from: _0x58615b,
  quoted: _0x12b195,
  body: _0x466314,
  isCmd: _0x476ed5,
  command: _0x13ff48,
  args: _0x1115ff,
  q: _0x1ef769,
  isGroup: _0x2c3808,
  sender: _0x317e54,
  senderNumber: _0x58932d,
  botNumber2: _0xf1d812,
  botNumber: _0x4e133d,
  pushname: _0x59ad66,
  isMe: _0x137414,
  isOwner: _0x58a0e2,
  groupMetadata: _0x4cdbf9,
  groupName: _0x23a9c3,
  participants: _0x1f63b8,
  groupAdmins: _0x2d6bc6,
  isBotAdmins: _0x133c52,
  isAdmins: _0x566f49,
  reply: _0x158882
}) => {
  try {
    if (!_0x1ef769) {
      return _0x158882("*Please give me a YT url or Title*");
    }
    const _0x541ffb = await yts(_0x1ef769);
    const _0x49d7ef = _0x541ffb.videos[0x0];
    const _0x40d7ef = _0x49d7ef.url;
    let _0x3d4fc8 = `
    ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▱
    *❍🌟 APEX-MD SONG DOWNLOADER 🌟❍*
    ⁠⁠⁠⁠▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▱
    
    ❍ *Title ➤* " + _0x246f2c.title + "
    ❍ *Description ➤* " + _0x246f2c.description + "
    ❍ *Duration ➤* " + _0x246f2c.timestamp + "
    ❍ *Ago ➤* " + _0x246f2c.ago + "
    ❍ *Views ➤* " + _0x246f2c.views + "
    ❍ *URL ➤* " + _0x246f2c.url + "
    
    > *Powered by Team MRFG ❍ (SxL)* 
`;
    await _0x55d0ac.sendMessage(_0x58615b, {
      'image': {
        'url': _0x49d7ef.thumbnail
      },
      'caption': _0x3d4fc8
    }, {
      'quoted': _0x5a89fd
    });
    let _0x4d56b7 = await fg.ytv(_0x40d7ef);
    let _0x22e21a = _0x4d56b7.dl_url;
    let _0x1b6348 = await _0x55d0ac.sendMessage(_0x58615b, {
      'video': {
        'url': _0x22e21a
      },
      'mimetype': "video/mp4",
      'caption': "*Powered by Team MRFG ❍ (SxL)*"
    }, {
      'quoted': _0x5a89fd
    });
    await _0x55d0ac.sendMessage(_0x58615b, {
      'react': {
        'text': '✅',
        'key': _0x1b6348.key
      }
    });
  } catch (_0x2fc383) {
    console.log(_0x2fc383);
    _0x158882('' + _0x2fc383);
  }
});
