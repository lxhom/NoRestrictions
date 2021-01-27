// ==UserScript==
// @name         NoRes TamperMonkey thingy
// @version      0.1
// @description  monke
// @author       lxhom (code), 0x0verflow (style)
// @match        https://www.youtube.com/watch?*
// @grant        none
// ==/UserScript==
(function() {
  let inserterFn = (async function(data = "") {
      document.querySelector('#error-screen > #container').innerHTML = `<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Loading...</h1></div>`;
      if (data == "") {
          if (location.hostname.includes("youtube.")) {
              let videoID = location.href.match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13);
              data = await (await fetch("https://www.youtube.com/get_video_info?video_id=" + videoID)).text();
          } else {
              data = await (await fetch("https://cors-anywhere.herokuapp.com/https://www.youtube.com/get_video_info?video_id=" + prompt("You are not on YouTube, please enter a YouTube Video URL:").match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13))).text();
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
  let html = `<div style="width: calc(100% - 20px); height: calc(100% - 20px); border: solid #2b2b2b 10px;">
                 <div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: left; color: white;">
                     <h1 style="cursor: default; margin-bottom: 5px; font-weight: 600; text-transform: uppercase;">CHOOSE A FORMAT.</h1>
                     <p style="cursor: default; color: #353535; font-size: 12px; font-weight: 600; margin-bottom: 10px; text-transform: uppercase;">THE VIDEO YOU\'VE BEEN TRYING TO PLAY HAS BEEN AGE RESTRICTED.</p>`;
  buttons.forEach((v) => {
    html += `<button style="cursor: pointer; text-transform: uppercase; padding: 10px 30px; background: #181818; color: white; font-weight: 600; font-size=17px; border: none; border-radius: 2px; margin: 10px 10px 10px 0px;" onclick="(document.querySelector('#error-screen > #container') != null ? document.querySelector('#error-screen > #container') : document.body).innerHTML = '<iframe id=\\'lx-player\\' allowfullscreen=\\'true\\' src=\\'${v.link}\\' style=\\'width: 100%; height: 100%; border: 0;\\'></iframe>';window.lx_player=document.getElementById('lx-player'); window.lx_player.vid_url='` + location.href + `'">${v.format}</button>`;
  });
  html += "</div></div>";
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
