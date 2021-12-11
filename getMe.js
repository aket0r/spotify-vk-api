const fs = require('fs')
const { VK } = require('vk-io');
const colors = require('colors');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "ВАШ ТОКЕН";
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


const vk = new VK({
	token: "ВАШ ТОКЕН"
});
const id = 320494971;
var spotify_id = '';
var init = null;

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
  await console.log(`${text}`.green);
}
getStatus();

//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    // getUserPlaylists(me.body.id);
    run(me.body.id);
    // getCurrentSongDuration(me.body.id);
    spotify_id = me.body.id;
  })().catch(e => {
    console.error(e);
  });
}

// RUN
async function run(userID) {
  const data = await spotifyApi.getMyCurrentPlaybackState(userID);
  const duration = data.body.item.duration_ms;
  const progress = data.body.progress_ms;
  const currentPlaySong = data.body.item.name;
  const artist = data.body.item.artists[0];

  var total = duration - progress;
  await console.log(`\n     ${duration} | ${progress} | ${duration - progress}\n`.green);
  await changeStatus(`Слушает в Spotify «${currentPlaySong}, ${artist.name}»`);
  await getStatus();

  setTimeout(() => {
    run(spotify_id);
  }, total);
}.catch((e) => {
  console.log(`${e}`.red);
})

getMyData();
