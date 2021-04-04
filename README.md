# No Restrictions

[TL;DR](#tldr) | [GitHub Page](https://github.com/lxhom/NoRestrictions) | [YT Link converter](https://www.nores.ml/watch)

## Introduction

No Restrictions is a Tool for YouTube to avoid age restrictions. It is a JavaScript that should be executed on the nores website or the YouTube page that injects the direct video link into the player error page and thus displays the video. Credits to the guys at [youtube-dl](https://github.com/ytdl-org/youtube-dl) for figuring out [how to get the direct video link](https://github.com/ytdl-org/youtube-dl/blob/4759543f6e5d532795eb1d5434692bb6d5e1f0ec/youtube_dl/extractor/youtube.py), which is one of the main features of this program. You should definitely check out youtube-dl :D

> NOTE: No Restrictions is still in a beta phase. It's intended to view age-restricted videos right now, but other videos might not work right now. It's on my to-do list. :)

## Usage
### Via TamperMonke(y) - one time installation
Using NoRes via TamperMonkey is relatively easy. To install it, do the following:

1. Install TamperMonkey for your browser:
   - Firefox: https://addons.mozilla.org/firefox/addon/tampermonkey/
   - Chrome: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=de
   - ...
   
2. Install the NoRes userscript:
   - Click the following link and confirm the installation: https://nores.ml/nores.user.js

Aaaaand you're done. Now have fun watching some nasty things. I'd recommend Dead Meat for the beginning...


### Via traditional methods - quick and easy
> NOTE: Safari Users can only use Method 1/2.

There are 5 main ways to use No Restrictions:

1. Use the No Restrictions Webpage. The easiest method, recommended if you dont want to use Web Injects.

2. Use the No Restrictions Replacer URL. The fastest method, reccomended if you are lazy.

3. Injecting the script with a special `javascript:` URL. Recommended for single-use for advanced users.

4. Injecting the script with a Bookmark with a `javascript:` URL, a.k.a a *Bookmarklet* (short for **Bookmark**ed JavaScript App**let**). Recommended for repeated use for advanced users. This works basically everywhere.

5. Pasting the script into the JavaScript Console of the Browser Development Tools, a.k.a *Inspect Element*. Only for advanced users. This works only on Development or Desktop browsers.

### Installation / Injection

- Method 1: Go to [NoRes.ml/watch](https://www.nores.ml/watch) and paste the URL of a YouTube video into the popup and hit OK.

- Method 2: Visit a YouTube video (for example https://www.youtube.com/watch?v=dQw4w9WgXcQ) and replace the `www.youtube.com` (or `youtube.com` if there is no `www`) with `www.nores.ml` (for example https://www.nores.ml/watch?v=dQw4w9WgXcQ)

- Method 3: Click on the URL bar of a YouTube tab, type `javascript:` (***You HAVE to type it or this method WON'T WORK***) and paste the text from [the `jsurl` file](https://github.com/lxhom/NoRestrictions/blob/main/jsurl) or from [below](#the-javascript-url) after the `javascript:` text, and hit Enter.

- Method 4: You can create a Bookmarklet by importing a Netscape Bookmark File (supported by all modern desktop browsers and a few mobile browsers). Go to your browser's bookmarks page and click on *Import Bookmarks* (this might be hidden in a menu, for example in Chrome Desktop it's in the menu at the top right) and select Bookmarks.html. You can download the Bookmarks.html file [here](/Bookmarks.html). Or you can manually create it by making a new Bookmark with the `javascript:` URL from [the `jsurl` file](https://github.com/lxhom/NoRestrictions/blob/main/jsurl) or from [below](#the-javascript-url). Click on *Create new Bookmark*, enter `No Restrictions` as the name and enter the `javascript:` URL as the URL.

- Method 5: Copy the [main.js file](https://github.com/lxhom/NoRestrictions/blob/main/main.js) into your console.

### Example

Try watching HowToBasic's How To Have S\*x video [NSFW] on [YouTube](https://www.youtube.com/watch?v=Z-dEeBNT4IQ) and on [NoRestrictions](https://www.nores.ml/watch?v=Z-dEeBNT4IQ) :)

### TL;DR

Bypass YTs Age Restrictions. Either use [NoRes.ml/watch](https://www.nores.ml/watch) and paste the YouTube Video URL - or replace the `www.youtube.com` (or `youtube.com` if there is no `www`) with `www.nores.ml` on a YouTube Page - or use the 3nd method (Web Inject): Click on the URL bar of a YouTube tab, type `javascript:` (***Type it or it WON'T WORK***) and paste the code below and hit Enter.

### The `javascript:` URL

```js
!async function(e=""){if(null==document.querySelector("#error-screen > #container")&&(console.log("aaaaaa"),document.body.outerHTML="<body style='margin: 0; width: 100vw; height: 100vh'></body>"),(null!=document.querySelector("#error-screen > #container")?document.querySelector("#error-screen > #container"):document.body).innerHTML='<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Loading...</h1></div>',""==e)if(location.hostname.includes("youtube.")){let t=location.href.match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13);e=await(await fetch("https://www.youtube.com/get_video_info?video_id="+t)).text()}else e=await(await fetch("https://soft-hat-b330.nores-cors.workers.dev/?https://www.youtube.com/get_video_info?video_id="+prompt("You are not on YouTube, please enter a YouTube Video URL:").match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13))).text();let t={};e.split("&").forEach(e=>{kv=e.split("="),t[kv[0]]=unescape(kv[1])});let o=JSON.parse(t.player_response).streamingData.formats,r=[];o.forEach(e=>{r.push({format:e.qualityLabel,link:e.url})});let n='<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Available Formats:</h1>';r.forEach(e=>{n+=`<button onclick="(document.querySelector('#error-screen > #container') != null ? document.querySelector('#error-screen > #container') : document.body).innerHTML = '<iframe allowfullscreen=\\'true\\' src=\\'${e.link}\\' style=\\'width: 100%; height: 100%; border: 0;\\'></iframe>'">${e.format}</button>`}),n+="</div>",(null!=document.querySelector("#error-screen > #container")?document.querySelector("#error-screen > #container"):document.body).innerHTML=n}();```
```
