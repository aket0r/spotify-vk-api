const fs = require('fs')
const { VK } = require('vk-io');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "ВАШ ТОКЕН SPOTIFT";
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


const vk = new VK({
	token: "ВАШ ТОКЕН ВК"
});
const id = 'ВАШ ID ВК';
var spotify_id = '';
var init = null;
var duration = null;

async function changeStatus(text) {
  const change = await vk.api.status.set({
      text: text
  });
}

async function getStatus() {
  const status = await vk.api.status.get({
      user_id: id
  });
  text = status.text;
  await console.log(`Статус в ВК: ${text}`);
}
getStatus();

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    // getUserPlaylists(me.body.id);
    getInfo(me.body.id);
    // getCurrentSongDuration(me.body.id);
    spotify_id = me.body.id;
  })().catch(e => {
    console.error(e);
  });
}

//TEST METHOD
async function getInfo(userID) {
  const data = await spotifyApi.getMyCurrentPlaybackState(userID);
  const currentTrack = await spotifyApi.getMyCurrentPlayingTrack();
  // console.log(data.body.item.duration_ms);

  var ms = data.body.progress_ms,
  min = Math.floor((ms/1000/60) << 0),
  sec = Math.floor((ms/1000) % 60);
  min = (min < 9) ? "0" + min : min;
  sec = (sec < 9) ? "0" + sec : sec;
  await console.log(`[Spotify] Текущий трек в Spotify: ${data.body.item.name} ${data.body.item.artists[0].name} | Прогресс трека: ${min}:${sec}м.`.green);
  await console.log(`[ВКонтакте] Статус в ВК: ${data.body.item.name}, ${data.body.item.artists[0].name}`.blue);

  changeStatus(`► Spotify: ${data.body.item.name}, ${data.body.item.artists[0].name}`);

  changeTimer(data.body.item.duration_ms - ms + 5000);
  duration = data.body.item.duration_ms - ms + 1000;
}


// CHANGE SONG AFTER HE'S END
async function changeTimer(ms, track) {
  const trackName = await spotifyApi.getMyCurrentPlayingTrack(spotify_id);
  track = trackName.body.item.name;
  setTimeout(() => {
    getInfo(spotify_id)
  }, ms);
}

getMyData();
