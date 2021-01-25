// javascript:(function()%7B
(async function(data = "") {
  if (document.querySelector('#error-screen > #container') == null) {
    console.log("aaaaaa");
    document.body.outerHTML="<body style='margin: 0; width: 100vw; height: 100vh'></body>";
  };
  (document.querySelector('#error-screen > #container') != null ? document.querySelector('#error-screen > #container') : document.body).innerHTML = '<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;"><h1>Loading...</h1></div>';
  if (data == "") {
    if (location.hostname.includes("youtube.")) {
      let videoID = location.href.match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13);
      data = await (await fetch("https://www.youtube.com/get_video_info?video_id="+videoID)).text();
    } else {
      data = await (await fetch("https://cors-anywhere.herokuapp.com/https://www.youtube.com/get_video_info?video_id="+prompt("You are not on YouTube, please enter a YouTube Video URL:").match(/v\=[a-zA-z0-9-\_]{11}/)[0].toString().substring(2,13))).text();
    }
  };
  let responseObject = {};
  data.split("&").forEach((value) => {
    kv = value.split("=");
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
    html += `<button onclick="(document.querySelector('#error-screen > #container') != null ? document.querySelector('#error-screen > #container') : document.body).innerHTML = '<iframe allowfullscreen=\\'true\\' src=\\'${v.link}\\' style=\\'width: 100%; height: 100%; border: 0;\\'></iframe>'">${v.format}</button>`;
  });
  html += "</div>";
  (document.querySelector('#error-screen > #container') != null ? document.querySelector('#error-screen > #container') : document.body).innerHTML = html;
})();
// %7D)()
