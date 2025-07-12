const SongsManager = function () {
  const urlPrefix = "https://www.youtube.com/watch?v=";
  const songs = {};

  const addSong = (songName, fullUrl) => {
    const urlSuffix = fullUrl.split("=")[1];
    songs[songName] = urlSuffix;
  };

  const getSong = (songName) => {
    const fullUrl = urlPrefix + songs[songName];
    console.log(fullUrl);
  };

  return {
    addSong: addSong,
    getSong: getSong,
  };
};

export default SongsManager;
