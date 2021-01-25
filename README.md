# No Restrictions

([TL;DR available](#tldr))

## Introduction

No Restrictions is a Tool for YouTube to avoid age restrictions. It is a JavaScript that should be executed on the YouTube page that injects the direct video link into the player error page and thus displays the video. Credits to the guys at [youtube-dl](https://github.com/ytdl-org/youtube-dl) for figuring out [how to get the direct video link](https://github.com/ytdl-org/youtube-dl/blob/4759543f6e5d532795eb1d5434692bb6d5e1f0ec/youtube_dl/extractor/youtube.py), which is one of the main features of this program. You should definitely check out youtube-dl :D

> wip: testing safari & webpage without injection with cors-anywhere

## Usage

There are 3 main ways to use No Restrictions:

1. Injecting the script with a special `javascript:` URL. Recommended for single-use.
2. Injecting the script with a Bookmark with a `javascript:` URL, a.k.a a *Bookmarklet* (short for **Bookmark**ed JavaScript App**let**). Recommended for repeated use. This works basically everywhere.
3. Pasting the script into the JavaScript Console of the Browser Development Tools, a.k.a *Inspect Element*. Not recommended for beginners. This works only on Development or Desktop browsers.

### Installation / Injection

- Method 1: Click on the URL bar of a YouTube tab, type `javascript:` (***You HAVE to type it or this method WON'T WORK***) and paste the text from [the `jsurl` file](/jsurl) or from [below](#the-javascript-url) after the `javascript:` text, and hit Enter.

- Method 2: You can create a Bookmarklet by importing a Netscape Bookmark File (supported by all modern desktop browsers and a few mobile browsers). Go to your browser's bookmarks page and click on *Import Bookmarks* (this might be hidden in a menu, for example in Chrome Desktop it's in the menu at the top right) and select Bookmarks.html. You can download the Bookmarks.html file [here](/Bookmarks.html). Or you can manually create it by making a new Bookmark with the `javascript:` URL from [the `jsurl` file](/jsurl) or from [below](#the-javascript-url). Click on *Create new Bookmark*, enter `No Restrictions` as the name and enter the `javascript:` URL as the URL.

- Method 3: Copy the [main.js file](/main.js) into your console.

## TL;DR

Bypass YTs Age Restrictions. Click on the URL bar of a YouTube tab, type `javascript:` (***Type it or it WON'T WORK***) and paste the code below and hit Enter.

### The `javascript:` URL

```js
javascript:function showButtons(buttons) { let html = '<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Available Formats:</h1>'; buttons.forEach((v) => { html += `<button onclick="replacePlayer(generateVideoHTML('${v.link}'))">${v.format}</button>`; }); html += "</div>"; replacePlayer(html); }; function generateVideoHTML(link) { return `<iframe allowfullscreen="true" src="${link}" style="width: 100%; height: 100%; border: 0;"></iframe>`; }; function replacePlayer(newHTML) { (document.querySelector("#error-screen > #container") != null ? document.querySelector("#error-screen > #container") : document.body).innerHTML = newHTML; }; (async function(data = "") { replacePlayer('<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Loading...</h1></div>'); if (data == "") { if (location.hostname.replace("www.","") == "youtube.com") { let videoID = location.href.match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13); data = await (await fetch("https://www.youtube.com/get_video_info?video_id="+videoID)).text(); } else { data = await (await fetch("http://cors-anywhere.herokuapp.com/https://www.youtube.com/get_video_info?video_id="+prompt("You are not on YouTube, please enter a YouTube Video URL:").match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13))).text(); } }; let responseObject = {}; data.split("&").forEach((value) => { kv = value.split("="); responseObject[kv[0]] = unescape(kv[1]); }); let playerResponse = JSON.parse(responseObject.player_response); let availFormats = playerResponse.streamingData.formats; let buttons = []; availFormats.forEach((val) => { buttons.push({format: val.qualityLabel, link: val.url}); }); showButtons(buttons); })();
```