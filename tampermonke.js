// ==UserScript==
// @name         NoRestrictions Tampermonke thingy
// @version      0.1
// @description  monke
// @author       lxhom
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==
(function() {
    let inserterFn = (async function(data = "") {
  if (document.querySelector('#error-screen > #container') == null) {
    console.log("aaaaaa");
  };
  document.querySelector('#error-screen > #container').innerHTML = '<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Loading...</h1></div>';
  if (data == "") {
    if (location.hostname.includes("youtube.")) {
      let videoID = location.href.match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13);
      console.log("starting fetch")
      data = await (await fetch("https://www.youtube.com/get_video_info?video_id="+videoID)).text();
      console.log("end fetch")
    } else {
      data = await (await fetch("https://cors-anywhere.herokuapp.com/https://www.youtube.com/get_video_info?video_id="+prompt("You are not on YouTube, please enter a YouTube Video URL:").match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13))).text();
    }
  };
  let responseObject = {};
  data.split("&").forEach((value) => {
    let kv = value.split("=");
    responseObject[kv[0]] = unescape(kv[1]);
  });
  let playerResponse = JSON.parse(responseObject.player_response);
  let availFormats = playerResponse.streamingData.formats;
  let buttons = [];
  availFormats.forEach((val) => {
    buttons.push({format: val.qualityLabel, link: val.url});
  });
  let html = '<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Available Formats:</h1>';
  buttons.forEach((v) => {
    html += `<button onclick="(document.querySelector('#error-screen > #container') != null ? document.querySelector('#error-screen > #container') : document.body).innerHTML = '<iframe id=\\'lx-player\\' allowfullscreen=\\'true\\' src=\\'${v.link}\\' style=\\'width: 100%; height: 100%; border: 0;\\'></iframe>';window.lx_player=document.getElementById('lx-player'); window.lx_player.vid_url='`+location.href+`'">${v.format}</button>`;
  });
  html += "</div>";
  (document.querySelector('#error-screen > #container') != null ? document.querySelector('#error-screen > #container') : document.body).innerHTML = html;
});
    let checkFn = function(){
        if (document.getElementsByTagName("yt-player-error-message-renderer").length != 0) {
            inserterFn();
        }
        if (window.lx_player != undefined && window.lx_player.vid_url != location.href) {
            window.lx_player.src = "";
            window.lx_player.remove();
            delete window.lx_player;
        }
    }
    setInterval(checkFn, 1000)
})()
